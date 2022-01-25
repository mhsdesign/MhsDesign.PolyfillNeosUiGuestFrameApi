<?php

namespace MhsDesign\PolyfillNeosUiGuestFrameApi;

use Neos\Eel\ProtectedContextAwareInterface;
use Neos\Flow\ObjectManagement\ObjectManagerInterface;
use Neos\Flow\Package\PackageManager;
use Neos\Flow\Annotations as Flow;

class PolyfillHelper implements ProtectedContextAwareInterface
{
    /**
     * @Flow\Inject
     * @var ObjectManagerInterface
     */
    protected $objectManager;

    /**
     * @Flow\CompileStatic
     */
    protected static function neosUiVersionIsLessThan72(ObjectManagerInterface $objectManager): bool
    {
        $packageManager = $objectManager->get(PackageManager::class);
        $neosUiPackage = $packageManager->getPackage('Neos.Neos.Ui');
        $neosUiVersion = $neosUiPackage->getInstalledVersion();
        $isNeosUiUsedBefore72Release = version_compare($neosUiVersion, '7.2.0', '<');
        return (bool)$isNeosUiUsedBefore72Release;
    }

    public function use(): bool
    {
        return self::neosUiVersionIsLessThan72($this->objectManager);
    }

    public function allowsCallOfMethod($methodName)
    {
        return true;
    }
}

import * as NeosUiGuestFrameDom from './neos-ui-guest-frame/dom';

// this is a rather hacky way to extend the consumerApi.
// we do this not in the manifest() as this would be fired to late.

const addExportToConsumerApi = () => {

    // check if the js object look like expected:
    if (typeof window["@Neos:HostPluginAPI"] !== 'object'
        || typeof window["@Neos:HostPluginAPI"]["@NeosProjectPackages"] !== 'function') {
        throw new Error(`Polyfill: 'MhsDesign.PolyfillNeosUiGuestFrameApi', cant be initialized because the consumer api was changed. 1643141497`)
    }

    /** type function */
    const consumerApiBeforeChange = window["@Neos:HostPluginAPI"]["@NeosProjectPackages"];

    const getAllPackageFromConsumerApi = (...args) => {
        const packages = consumerApiBeforeChange(...args);

        if (typeof packages !== 'object') {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiGuestFrameApi', expected 'packages' to be an object. 1643141500`);
            return packages;
        }

        if (typeof packages['NeosUiGuestFrameDom'] === 'object') {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiGuestFrameApi', was loaded even though 'NeosUiGuestFrameDom' exists already. 1643141501`);
            return packages;
        }

        // idk if we need this try catch
        try {
            // that's why were here:
            // packages.NeosUiGuestFrameDom = NeosUiGuestFrameDom;
            Object.defineProperty(packages, 'NeosUiGuestFrameDom', {
                value: NeosUiGuestFrameDom
            });
        } catch (e) {
            console.error(`Polyfill: 'MhsDesign.PolyfillNeosUiGuestFrameApi', couldn't add package to consumer api: '${e.message}' 1643141498`);
        }

        return packages;
    }

    // idk if we need this try catch, but since that throws, im carefully ... 'Cannot assign to read only property '@NeosProjectPackages' of object '#<Object>''
    // window["@Neos:HostPluginAPI"]["@NeosProjectPackages"] = getAllPackageFromConsumerApi
    try {
        Object.defineProperty(window["@Neos:HostPluginAPI"], "@NeosProjectPackages", {
            value: getAllPackageFromConsumerApi
        });
    } catch (e) {
        throw new Error(`Polyfill: 'MhsDesign.PolyfillNeosUiGuestFrameApi', couldn't override consumer api: '${e.message}' 1643141499`)
    }
}

addExportToConsumerApi();

await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    swcMinify: true,

    images: {
        remotePatterns: [
            {
                hostname: "server.nucast.io",
            },
        ],
    },

    webpack: function (config, options) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
};

export default config;

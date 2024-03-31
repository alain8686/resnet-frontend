import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, {  }) => {
        config.resolve.extensions.push(".ts", ".tsx");
        config.resolve.fallback = { fs: false };
    
        config.plugins.push(
        new NodePolyfillPlugin(), 
        new CopyPlugin({
          patterns: [
            {
              from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
              to: '_next/static/chunks',
            },             {
              from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
              to: '_next/static/chunks',
            },          
              {
                from: './model',
                to: 'static/chunks/pages',
              },
            ],
          }),
        );
    
        return config;
      } 
};

export default nextConfig;

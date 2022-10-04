// vite.config.ts
import {
  URL,
  fileURLToPath
} from "node:url";
import {
  defineConfig
} from "vite";
import dts from "vite-plugin-dts";
var __vite_injected_original_import_meta_url = "file:///Users/daniel/Repos/cosmicmind/workspace/libs/algo/vite.config.ts";
var packageName = process.env.npm_package_name;
var packageVersion = JSON.stringify(process.env.npm_package_version);
var external = [
  "@cosmicmind/foundation"
];
var globals = {};
var emptyOutDir = true;
var formats = ["es"];
var vite_config_default = defineConfig(({ mode }) => {
  const watch = "watch" === mode ? {
    include: [
      "src/**/*"
    ]
  } : void 0;
  return {
    define: {
      "__PACKAGE_NAME__": packageVersion,
      "__PACKAGE_VERSION__": packageVersion
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    plugins: [
      dts()
    ],
    build: {
      emptyOutDir,
      lib: {
        name: packageName,
        entry: "src/index.ts",
        formats,
        fileName: "lib.es"
      },
      rollupOptions: {
        external,
        output: {
          globals
        }
      },
      watch
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFuaWVsL1JlcG9zL2Nvc21pY21pbmQvd29ya3NwYWNlL2xpYnMvYWxnb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhbmllbC9SZXBvcy9jb3NtaWNtaW5kL3dvcmtzcGFjZS9saWJzL2FsZ28vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2RhbmllbC9SZXBvcy9jb3NtaWNtaW5kL3dvcmtzcGFjZS9saWJzL2FsZ28vdml0ZS5jb25maWcudHNcIjtpbXBvcnQge1xuICBVUkwsXG4gIGZpbGVVUkxUb1BhdGgsXG59IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQge1xuICBkZWZpbmVDb25maWcsXG4gIExpYnJhcnlGb3JtYXRzLFxufSBmcm9tICd2aXRlJ1xuXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuY29uc3QgcGFja2FnZU5hbWUgPSBwcm9jZXNzLmVudi5ucG1fcGFja2FnZV9uYW1lXG5jb25zdCBwYWNrYWdlVmVyc2lvbiA9IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pXG5cbmNvbnN0IGV4dGVybmFsID0gW1xuICAnQGNvc21pY3ZlcnNlL2ZvdW5kYXRpb24nXG5dXG5jb25zdCBnbG9iYWxzID0ge31cbmNvbnN0IGVtcHR5T3V0RGlyID0gdHJ1ZVxuY29uc3QgZm9ybWF0czogTGlicmFyeUZvcm1hdHNbXSA9IFsgJ2VzJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3Qgd2F0Y2ggPSAnd2F0Y2gnID09PSBtb2RlID8ge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdzcmMvKiovKidcbiAgICBdLFxuICB9OiB1bmRlZmluZWRcblxuICByZXR1cm4ge1xuICAgIGRlZmluZToge1xuICAgICAgJ19fUEFDS0FHRV9OQU1FX18nOiBwYWNrYWdlVmVyc2lvbixcbiAgICAgICdfX1BBQ0tBR0VfVkVSU0lPTl9fJzogcGFja2FnZVZlcnNpb24sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBkdHMoKVxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIGVtcHR5T3V0RGlyLFxuICAgICAgbGliOiB7XG4gICAgICAgIG5hbWU6IHBhY2thZ2VOYW1lLFxuICAgICAgICBlbnRyeTogJ3NyYy9pbmRleC50cycsXG4gICAgICAgIGZvcm1hdHMsXG4gICAgICAgIGZpbGVOYW1lOiAnbGliLmVzJyxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBnbG9iYWxzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdhdGNoLFxuICAgIH0sXG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VTtBQUFBLEVBQ3RVO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFFUDtBQUFBLEVBQ0U7QUFBQSxPQUVLO0FBRVAsT0FBTyxTQUFTO0FBVjRMLElBQU0sMkNBQTJDO0FBWTdQLElBQU0sY0FBYyxRQUFRLElBQUk7QUFDaEMsSUFBTSxpQkFBaUIsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFFckUsSUFBTSxXQUFXO0FBQUEsRUFDZjtBQUNGO0FBQ0EsSUFBTSxVQUFVLENBQUM7QUFDakIsSUFBTSxjQUFjO0FBQ3BCLElBQU0sVUFBNEIsQ0FBRSxJQUFLO0FBRXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sUUFBUSxZQUFZLE9BQU87QUFBQSxJQUMvQixTQUFTO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGLElBQUc7QUFFSCxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixvQkFBb0I7QUFBQSxNQUNwQix1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxJQUNOO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

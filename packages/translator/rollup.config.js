import typescript from "rollup-plugin-typescript2";
import mangleInternal from "../../utilities/rollup-plugin-mangle-internal";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs"
    }
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: false, emitDeclarationOnly: false }
      }
    }),
    mangleInternal()
  ]
};

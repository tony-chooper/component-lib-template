export const unocssFix = {
  name: "unocss:fix-dist-chunk",
  apply: "build",
  resolveId(id: string) {
    if (id === "virtual:uno.css") {
      return id;
    }
  },
  load(id: string) {
    if (id === "virtual:uno.css") {
      return { code: "" };
    }
  },
};

export const replaceScssToCss = () => {
  return {
    name: "replace-scss-to-css",
    generateBundle(config: any, bundle: any) {
      const keys = Object.keys(bundle);
      for (const key of keys) {
        const bundler: any = bundle[key];
        // @ts-ignore
        this.emitFile({
          type: "asset",
          fileName: key,
          source: bundler?.code?.replace(/\.scss/g, ".css"),
        });
      }
    },
  }
} 

export const removeEmptyVue3Mjs = () => {
  return {
    name: "remove-empty-vue3-mjs",
    generateBundle(options: any, bundle: any) {
      for (const fileName of Object.keys(bundle)) {
        if (
          fileName.endsWith(".vue3.mjs") &&
          (!bundle[fileName]?.code || bundle[fileName]?.code?.trim() === "")
        ) {
          delete bundle[fileName];
        }
      }
    },
  }
}
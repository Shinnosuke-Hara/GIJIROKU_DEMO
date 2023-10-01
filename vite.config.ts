import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/**
 * See https://ja.vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  /**
   * modeに基づいて現在の作業ディレクトリにある env ファイルをロードする
   * これにより、環境変数を process.env から取得できる
   */
  const env = loadEnv(mode, process.cwd(), "");

  return {
    /**
     * tsconfig.jsonの baseUrl, paths を解決する
     */
    resolve: {
      alias: {
        "@/": `${__dirname}/src/`,
        "@common/": `${__dirname}/src/common/`,
        "~/": `${__dirname}/public/`,
      },
    },

    plugins: [
      react(),

      /**
       * 環境変数をViteに渡す
       * これにより、Viteのビルド時に環境変数を参照できる
       */
      {
        name: "vite:env",
        config: () => ({
          define: {
            "process.env": env,
          },
        }),
      },
    ],

    /**
     * デフォルトでは環境変数は VITE_*** とプレフィックスをつけて定義するが、
     * ReactCreateAppからViteに移行するという経緯から、環境変数を変える手間を省くためにプレフィックスをREACT_APPとしている
     */
    envPrefix: "REACT_APP_",

    build: {
      /**
       * ルートディレクトリの "build" フォルダにビルド結果を出力する
       * `.gcloudignore` にて、 `build` フォルダをApp Engineにデプロイするように指定しているため、両ファイルでフォルダ名を一致させる必要がある
       */
      outDir: "build",

      /**
       * Sentryに送信するソースマップを生成する（エラー発生箇所を特定しやすくなる）
       *
       * trueまたはhiddenを指定するとソースマップを生成でき、
       * ビルドが完了すると /build/assets/ 以下にソースマップが生成される
       *
       * hiddenを指定すると、以下のようなバンドルファイル内(/build/assets/***.js)の最終行から、
       * 以下のようなソースマップの所在を指し示すコメントが削除される
       * ex) //# sourceMappingURL=index-********.js.map
       *
       * このコメントを削除することで "DevTools failed to load source map" のコンソールエラーを回避できる
       * (実際には以下の理由でソースマップをサーバーにデプロイしないため、ブラウザはソースマップを読み込めない)
       *
       * [重要] ソースマップがクライアント側に流出すると、ビルドで難読化されたソースコードが復元されて簡単に読めてしまう
       * そこで、Google App Engineにソースマップがデプロイされないように `.gcloudignore` にて、 `/build\/**\/*.map` を指定している
       */
      sourcemap: "hidden",
    },

    /**
     * localhostのポートを指定する
     */
    server: {
      port: 3003,
    },
  };
});

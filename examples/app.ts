import * as b from "bobril";
import * as g from "bobril-g11n";
import * as f from "./src/flux";
import * as s from "./src/states";
import * as c from "./src/states.cursors";
import * as mp from "./src/mainPage";

g.initGlobalization({
    defaultLocale: 'cs-CZ',
    pathToTranslation(locale: string): string { return './translations/' + locale + '.js'; }
});


f.bootstrap(s.createDefaultApplicationState(), { });

b.routes(
    b.route(
        {
            url: "/",
            handler: mp.createMainPage(c.rootCursor)
        },
        mp.createRoutes())
);

g.setLocale('cs-CZ');
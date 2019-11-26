CHANGELOG
===

10.0.0
--

Fixed
-
Compatibility with Bobril 14.0.0

9.2.0
--

Fixed
-
Improved typesafetyness with Bobril 13.


9.1.1
--

Fixed
-
Used and set component factory.

9.1.0
--

Fixed
-
New way how to write components in Bobril.


9.0.0
--

New Features
-
Upgraded fun-model for "Removed default replace handler from createAction. Use the new createReplaceAction instead".

8.1.0
--

New Features
-
Added way to detect forceShouldChange enabled component, by having it always available in ctx.
Simplified code in route component.
Fixed and simplified tests by b.syncUpdate() feature.

8.0.0
--

New Features
-
Upgraded fun-model for createParamLessAction and support for nullability in cursors.

7.0.0
--

New Features
-

Upgraded fun-model and fixed new bootstrap api.
Fixed tsc restrictions.

6.0.0
--

New Features
-

Upgraded fun-model for state freezing feature. This supports detection of immutability violation in development by throwing exception. Debug mode is enabled if you have set debugCallback in bootstraping. Thanks for the idea of GMC Software Team.

5.4.0
--

New Features
-

Added optional parentRouteName to IRouteData for nested route components and its routing.

5.3.0
--

New Features
-

Added support for passing cursors map into component factory.

5.2.0
--

New Features
-

Changed creation of Bobflux components. Components are created as virtual through createVirtualComponent.

5.1.0
--

New Features
-

Added and generated "types": "index.d.ts" into package.json. Supported by TS 2.0.

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.14.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.13.0...v0.14.0) (2021-07-27)


### Features

* add error handling for missing items array and missing item id ([13a49bf](https://github.com/vtex/external-promotion-provider-middleware/commit/13a49bf590281b13d5dc0af362fc8969eee2bed6))
* add error handling to calculateExternalBenefits middleware ([01638c6](https://github.com/vtex/external-promotion-provider-middleware/commit/01638c6399fdb8afe5656ec9f8020313915718d6))
* add error handling to externalProviderClient ([2694e2e](https://github.com/vtex/external-promotion-provider-middleware/commit/2694e2e9c3c4cc1b4d12bb7251b840a938e7efdb))

## [0.13.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.12.0...v0.13.0) (2021-07-26)


### Tests

* test applyApportionment ([d5b2b80](https://github.com/vtex/external-promotion-provider-middleware/commit/d5b2b80e6d3ad1121283cefbb743d614578ad007))


### Chores

* add versionrc to configure standard-version ([8a47a30](https://github.com/vtex/external-promotion-provider-middleware/commit/8a47a30f0d13fc958681d3d9b1bedc0eeb8955dd))

## [0.12.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.11.0...v0.12.0) (2021-07-23)


### Bug Fixes

* fix nominal discount sum ([7506038](https://github.com/vtex/external-promotion-provider-middleware/commit/75060385e070e0a9491d39507102368ed36ba7cc))

## [0.11.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.10.0...v0.11.0) (2021-07-23)


### Features

* make getOrderformById return sensitive info without mask ([6901c61](https://github.com/vtex/external-promotion-provider-middleware/commit/6901c616dbf2aab5fc54beb90d092f1de85f0902))

## [0.10.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.9.0...v0.10.0) (2021-07-23)


### Features

* add Apportionment method ([1fac3ad](https://github.com/vtex/external-promotion-provider-middleware/commit/1fac3ad17aa75e836bf7c10b5157828eb2d2779d))
* add Apportionment method and updates items prices based on apportioned price and index ([5915bd8](https://github.com/vtex/external-promotion-provider-middleware/commit/5915bd8efd711f571bbae461aa38e4347652f358))

## [0.9.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.8.0...v0.9.0) (2021-07-21)


### Features

* add return to simulation route ([df4c4c9](https://github.com/vtex/external-promotion-provider-middleware/commit/df4c4c92795b27f6bc247fe12a679271b7fb0c75))

## [0.8.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.7.0...v0.8.0) (2021-07-16)


### Features

* add format orderform util ([d404e8c](https://github.com/vtex/external-promotion-provider-middleware/commit/d404e8c77ed3eaf90cfe36162039684c308e5bae))

## [0.7.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.6.0...v0.7.0) (2021-07-16)


### Features

* add external endpoint as base url in externalProvider super ([c536d84](https://github.com/vtex/external-promotion-provider-middleware/commit/c536d84893d39894c2daa4298fb934d2f987a310))
* add external endpoint to settings context ([8be6beb](https://github.com/vtex/external-promotion-provider-middleware/commit/8be6bebca773f5292d327a45f8a08d099a060958))
* add getAppConfiguration middleware to routes ([d8a5928](https://github.com/vtex/external-promotion-provider-middleware/commit/d8a5928a28561dd3adfb3658c24d8e79a0de575c))
* add getBenefits method to calculateExternalBenefits middleware ([31ff463](https://github.com/vtex/external-promotion-provider-middleware/commit/31ff463e2f70c2f1ed7e9e70e3e3e3645f9fc805))
* add getOrderformById middleware ([5f3b825](https://github.com/vtex/external-promotion-provider-middleware/commit/5f3b825ddd7cfec2a7c1d98985ad7861565b874d))
* add orderform service ([ece6215](https://github.com/vtex/external-promotion-provider-middleware/commit/ece62158abfeea1c4fc3d929966d20ef564c91ea))

## [0.6.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.5.0...v0.6.0) (2021-07-14)


### Features

* add new getAppConfiguration middleware ([ea64003](https://github.com/vtex/external-promotion-provider-middleware/commit/ea6400394fd6628f13d355835a4c331aabb73f23))

## [0.5.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.4.0...v0.5.0) (2021-07-13)

## [0.4.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.3.0...v0.4.0) (2021-07-12)


### Features

* add orderform configuration setup service ([93e51bd](https://github.com/vtex/external-promotion-provider-middleware/commit/93e51bd7b9c0efa5331d749b0e1333cb94259501))

## [0.3.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.2.0...v0.3.0) (2021-07-10)


### Features

* add try catch around getAppSettings ([cab35a6](https://github.com/vtex/external-promotion-provider-middleware/commit/cab35a6b0420ac7b3984fbab7555012e3d9d8915))

## 0.2.0 (2021-07-09)


### Features

* add event to listen to settings update ([f2bdbe2](https://github.com/vtex/external-promotion-provider-middleware/commit/f2bdbe22cabd84e2084df36fe6b74459f5e8808a))
* add settings to app ([d624446](https://github.com/vtex/external-promotion-provider-middleware/commit/d624446d0bf02f09e96f764f520a240f3cf2195b))


### Bug Fixes

* fix standard-version scripts ([5c33109](https://github.com/vtex/external-promotion-provider-middleware/commit/5c3310947d3cfc84f0333cd7f9ab428c29331f71))

## 0.1.0 (2021-07-08)


### Features

* Initial implementation

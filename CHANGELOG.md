# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.24.0-beta.4](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.24.0-beta.3...v0.24.0-beta.4) (2021-08-20)


### Features

* handle no items error in orderForm before deleting manualPrices ([4360943](https://github.com/vtex/external-promotion-provider-middleware/commit/4360943e507a0bfc834adac99db407be05c16284))
* improve error message ([50a4694](https://github.com/vtex/external-promotion-provider-middleware/commit/50a4694508437f715e4fc901bc25511c66ef6a61))

## [0.24.0-beta.3](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.24.0-beta.2...v0.24.0-beta.3) (2021-08-20)

## [0.24.0-beta.2](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.24.0-beta.1...v0.24.0-beta.2) (2021-08-19)


### Bug Fixes

* adjust endpoint config suggested when error is thrown ([19e5e95](https://github.com/vtex/external-promotion-provider-middleware/commit/19e5e951591751dc0553e88380490de778629e24))

## [0.24.0-beta.1](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.24.0-beta.0...v0.24.0-beta.1) (2021-08-18)


### Bug Fixes

* adjust customData data structure ([e8d3507](https://github.com/vtex/external-promotion-provider-middleware/commit/e8d3507bff24607f412c63ed999b80ccc67a6e34))

## [0.24.0-beta.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.22.0-beta.7...v0.24.0-beta.0) (2021-08-17)


### Features

* improve error handling on getOrderFormById method ([20309a2](https://github.com/vtex/external-promotion-provider-middleware/commit/20309a2e4d6a6f5d71160734e6582c85ad0a3efa))
* shorten payload of log sent to splunk ([ab503b4](https://github.com/vtex/external-promotion-provider-middleware/commit/ab503b49c914c07b4c29febd8d188d6cf810310a))


### Bug Fixes

* fix email change when ger orderform has auth ([9030cbb](https://github.com/vtex/external-promotion-provider-middleware/commit/9030cbb701de77ee336efa04224364eb7b72deb3))


### Chores

* bump version to stable ([dde9336](https://github.com/vtex/external-promotion-provider-middleware/commit/dde93364838a1bc6d56f585ad852840af60cd3eb))


### Refacts

* refact to spread state in context ([3aae792](https://github.com/vtex/external-promotion-provider-middleware/commit/3aae792bb286143ddcb617986447a230ee185c2e))


### Tests

* adjust test context to include payments property ([2a61a07](https://github.com/vtex/external-promotion-provider-middleware/commit/2a61a07d73e3b7130e0cdfc009e8ca107953bfbc))

## [0.23.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.22.0-beta.7...v0.22.0) (2021-08-16)

## [0.22.0-beta.7](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.22.0-beta.5...v0.22.0-beta.7) (2021-08-10)


### Features

* add index property to request protocol ([c90b43e](https://github.com/vtex/external-promotion-provider-middleware/commit/c90b43e0b1f83c4b1889a16ea23befb86c53cda7))


### Chores

* bump version ([d57dae2](https://github.com/vtex/external-promotion-provider-middleware/commit/d57dae2d90d2d65237c53a1602a2d16098aa9994))


### Tests

* adjust mock to fit new model ([cf38162](https://github.com/vtex/external-promotion-provider-middleware/commit/cf3816287892b32c7923f9bc960912484803ff93))

## [0.22.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.21.0...v0.22.0) (2021-08-04)


### Features

* add error handling to setSingleCustomData method ([2ab66ae](https://github.com/vtex/external-promotion-provider-middleware/commit/2ab66ae48b238a4e69f807971134d1617ef7c2b9))
* add splunk logs for when something fails in applyManualPrices middleware ([c52ee33](https://github.com/vtex/external-promotion-provider-middleware/commit/c52ee3353b6443439c991d38ed97bd34c3962ec8))


### Tests

* add new test to parseOrderFormToProtocol util ([f815062](https://github.com/vtex/external-promotion-provider-middleware/commit/f815062eccd75d2d160f5ee20904e7cf7923ffe7))
* test applyApportionment middleware ([0b585d8](https://github.com/vtex/external-promotion-provider-middleware/commit/0b585d85b5cc93aeed3f4782527acd430fd73fe5))
* test applyManualPrices middleware ([283c2e2](https://github.com/vtex/external-promotion-provider-middleware/commit/283c2e285d978ab2ccbaf93a79116f9d8dcd8eda))
* test customData service ([88cc5fb](https://github.com/vtex/external-promotion-provider-middleware/commit/88cc5fb8208d9d0b9e6483b220ebeb5cff9a4984))
* test getOrderFormById middleware ([12f3251](https://github.com/vtex/external-promotion-provider-middleware/commit/12f3251fed9b66a22ec75f06d9534d6a518d7a05))
* test orderForm service ([418f22e](https://github.com/vtex/external-promotion-provider-middleware/commit/418f22e10ebb5c00f39ab44cf6aa2959725b8f8f))

## [0.21.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.20.0...v0.21.0) (2021-08-03)


### Features

* add 30s timeout to app routes ([d524ecb](https://github.com/vtex/external-promotion-provider-middleware/commit/d524ecb7e64fc193b665a064dcf0511b96056b3b))
* add new yup validations and remove old matchedParams logic ([bf29dfd](https://github.com/vtex/external-promotion-provider-middleware/commit/bf29dfd4127f7b34b960232ff84f3070c3f43042))
* improve error legibility from yup errors and adequate test to these changes ([67bdb27](https://github.com/vtex/external-promotion-provider-middleware/commit/67bdb27e18a2c603e266140a481e6d53094f5d93))
* set timeout for both app and externalProvider client ([3054fd2](https://github.com/vtex/external-promotion-provider-middleware/commit/3054fd2e1a80326448138c59e7a33c03e3c7c63e))


### Refacts

* improves error handling and removes checkout client ([8a680ea](https://github.com/vtex/external-promotion-provider-middleware/commit/8a680ea14584b7608d2b66c1b795e14bd03a81a6))


### Tests

* add tests to handle improved errors ([04ef08a](https://github.com/vtex/external-promotion-provider-middleware/commit/04ef08a85e8122273f4d8a3c717bdccf12ea6ddf))

## [0.20.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.19.0...v0.20.0) (2021-07-31)


### Features

* add new typings to matchedParams ([dcebf73](https://github.com/vtex/external-promotion-provider-middleware/commit/dcebf734e256e65280b7d793b940f2b5e339b8a9))
* add schemaConsistency method ([97fcf6e](https://github.com/vtex/external-promotion-provider-middleware/commit/97fcf6e601a6e6c38a952edce2e0a384ad7f9fc6))
* add schemaConsistency method to middleware ([52e9dca](https://github.com/vtex/external-promotion-provider-middleware/commit/52e9dca3961b7f9ddd6f39899dd031a6df0000b5))
* add yup schema for providerResponse validation ([6a9ef5f](https://github.com/vtex/external-promotion-provider-middleware/commit/6a9ef5f0a5099460a43fd6a7827a1fe3ed51fd89))


### Styles

* solve linting issues ([600cc95](https://github.com/vtex/external-promotion-provider-middleware/commit/600cc95879356a7f67073f570e7753a3ab5eec7e))


### Tests

* test validateProviderResponse util ([67b1490](https://github.com/vtex/external-promotion-provider-middleware/commit/67b1490b2aedd8a7eeff6df8cfd51c38b1bbc615))

## [0.19.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.18.0...v0.19.0) (2021-07-29)


### Features

* add error handling for when items array is falsy ([59439cd](https://github.com/vtex/external-promotion-provider-middleware/commit/59439cd076245bff785fbcfbb3fc309c0246af50))
* add return to scenario where external provider wants no promotions applied ([158935d](https://github.com/vtex/external-promotion-provider-middleware/commit/158935d513427df8efbeffd974c1ff69b9654422))


### Refacts

* refact return getOrderFormId method to pass less parameters ([cb501cc](https://github.com/vtex/external-promotion-provider-middleware/commit/cb501ccdfc3b09d2aa7f3c0f076e69b75e13e984))


### Tests

* change calculateExternalBenefits test to fit new logic ([71661bc](https://github.com/vtex/external-promotion-provider-middleware/commit/71661bcb88422739bc6ef6c0166caabce2ecbf38))

## [0.18.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.17.0...v0.18.0) (2021-07-29)


### Features

* add deleteAllManualPrices method to getOrderFormById flow ([822e30a](https://github.com/vtex/external-promotion-provider-middleware/commit/822e30a279570238c56c5be16279e5ed4bbbf22c))


### Bug Fixes

* removes previous logic from customData updates ([ffc5b61](https://github.com/vtex/external-promotion-provider-middleware/commit/ffc5b61639d847ee473a9d5dddb649ce47373119))


### Refacts

* spreads usage of targetCustomAppId ([cc27be3](https://github.com/vtex/external-promotion-provider-middleware/commit/cc27be3f742f5a4b985e2dd14a96061cba5a6fc6))
* store customAppId in variable ([3827ae4](https://github.com/vtex/external-promotion-provider-middleware/commit/3827ae487efd801e677b25268a2d2609fa9aa645))

## [0.17.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.16.0...v0.17.0) (2021-07-28)


### Features

* add customData service ([80f91e3](https://github.com/vtex/external-promotion-provider-middleware/commit/80f91e320a66b3baa512b8bf70467ae0418628ee))
* add setCustomData method to applyManualPrices middleware ([276523b](https://github.com/vtex/external-promotion-provider-middleware/commit/276523bf245a977067a5a35ea49eb7a8700e1258))


### Refacts

* change typings to include undefined scenarios ([7c47354](https://github.com/vtex/external-promotion-provider-middleware/commit/7c473544585c6b191abbee486a77116acabce1ac))
* exports getFlattenedExternalPromotions util ([4fa6e50](https://github.com/vtex/external-promotion-provider-middleware/commit/4fa6e5021de927417c39a894b6f3b10bd105fea4))
* refact nonVariableFields and variableFields loop to be more efficient ([0ba486c](https://github.com/vtex/external-promotion-provider-middleware/commit/0ba486cc33d3ba9f7a2088f98b02b5600d9afa15))
* refact nonVariableFields and variableFields loop to be more efficient ([d89a9f7](https://github.com/vtex/external-promotion-provider-middleware/commit/d89a9f74fa83e7e7970bb469318603d0c54235d0))

## [0.16.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.15.0...v0.16.0) (2021-07-27)


### Features

* add validateIndexConsistency method to applyManualPrices middleware ([83eee26](https://github.com/vtex/external-promotion-provider-middleware/commit/83eee26b707e13ac2c2ac24cc618d0ffd7a9c018))
* create validateIndexConsistency util ([5323ceb](https://github.com/vtex/external-promotion-provider-middleware/commit/5323cebc42382085cb48458b373395693a2f4c6d))

## [0.15.0](https://github.com/vtex/external-promotion-provider-middleware/compare/v0.14.0...v0.15.0) (2021-07-27)


### Tests

* test calculateExternalBenefits middleware ([10fa20c](https://github.com/vtex/external-promotion-provider-middleware/commit/10fa20cccdb48ff3cbe1bcce232427cd8c8d9483))

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

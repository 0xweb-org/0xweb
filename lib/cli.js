
// source ./RootModule.js
(function(){
	
	var _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase = {};
var _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase = {};
var _dequanto_contracts_gen_amm_AmmPairContractV2Base = {};
var _dequanto_contracts_gen_amm_AmmVaultV2ContractBase = {};
var _dequanto_contracts_gen_base_ERC20Base_ERC20Base = {};
var _dequanto_contracts_gen_xdai_WXDaiTokenContractBase = {};
var _dequanto_contracts_gnosis_GnosisSafe = {};
var _dequanto_contracts_openzeppelin_ERC1155 = {};
var _dequanto_contracts_openzeppelin_ERC20 = {};
var _dequanto_contracts_openzeppelin_ERC721 = {};
var _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory = {};
var _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider = {};
var _dequanto_src_BlockchainExplorer_Bscscan = {};
var _dequanto_src_BlockchainExplorer_Etherscan = {};
var _dequanto_src_BlockchainExplorer_Polyscan = {};
var _dequanto_src_ChainAccountProvider = {};
var _dequanto_src_ChainAccountsService = {};
var _dequanto_src_Config = {};
var _dequanto_src_blocks_BlockDateResolver = {};
var _dequanto_src_chains_PlatformFactory = {};
var _dequanto_src_chains_arbitrum_ArbTokenProvider = {};
var _dequanto_src_chains_arbitrum_ArbWeb3Client = {};
var _dequanto_src_chains_arbitrum_Arbiscan = {};
var _dequanto_src_chains_arbitrum_TokensServiceArbitrum = {};
var _dequanto_src_chains_xdai_XDaiWeb3Client = {};
var _dequanto_src_chains_xdai_XDaiscan = {};
var _dequanto_src_chains_xdai_tokens_WXDaiTokenContract = {};
var _dequanto_src_clients_BscWeb3Client = {};
var _dequanto_src_clients_ClientEventsStream = {};
var _dequanto_src_clients_ClientPool = {};
var _dequanto_src_clients_ClientPoolStats = {};
var _dequanto_src_clients_EthWeb3Client = {};
var _dequanto_src_clients_HardhatWeb3Client = {};
var _dequanto_src_clients_PolyWeb3Client = {};
var _dequanto_src_clients_Web3Client = {};
var _dequanto_src_clients_Web3ClientFactory = {};
var _dequanto_src_clients_model_ClientStatus = {};
var _dequanto_src_clients_model_PromiEventWrap = {};
var _dequanto_src_clients_utils_ClientEndpoints = {};
var _dequanto_src_clients_utils_ClientErrorUtil = {};
var _dequanto_src_contracts_ContractAbiProvider = {};
var _dequanto_src_contracts_ContractBase = {};
var _dequanto_src_contracts_ContractProvider = {};
var _dequanto_src_contracts_ContractReader = {};
var _dequanto_src_contracts_ContractStream = {};
var _dequanto_src_contracts_ContractWriter = {};
var _dequanto_src_contracts_TxContract = {};
var _dequanto_src_contracts_common_ERC20 = {};
var _dequanto_src_contracts_utils_AbiDeserializer = {};
var _dequanto_src_contracts_utils_InputDataUtils = {};
var _dequanto_src_env_BigIntSerializer = {};
var _dequanto_src_gen_Generator = {};
var _dequanto_src_gen_GeneratorFromAbi = {};
var _dequanto_src_hardhat_HardhatProvider = {};
var _dequanto_src_json_JsonArrayStore = {};
var _dequanto_src_loggers_LoggerService = {};
var _dequanto_src_ns_NameService = {};
var _dequanto_src_ns_providers_EnsProvider = {};
var _dequanto_src_ns_utils__ns = {};
var _dequanto_src_safe_GnosisSafeFactory = {};
var _dequanto_src_safe_GnosisSafeHandler = {};
var _dequanto_src_safe__gnosis = {};
var _dequanto_src_safe_transport_FileServiceTransport = {};
var _dequanto_src_safe_transport_GnosisServiceTransport = {};
var _dequanto_src_tokens_TokenDataProvider = {};
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract = {};
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract = {};
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract = {};
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service = {};
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract = {};
var _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase = {};
var _dequanto_src_tokens_TokenExchanges_PancakeswapExchange = {};
var _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange = {};
var _dequanto_src_tokens_TokenExchanges_UniswapExchange = {};
var _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle = {};
var _dequanto_src_tokens_TokenOracles_TokenPriceStore = {};
var _dequanto_src_tokens_TokenPriceService = {};
var _dequanto_src_tokens_TokenProviders_ATokenProvider = {};
var _dequanto_src_tokens_TokenProviders_TPChain = {};
var _dequanto_src_tokens_TokenProviders_TPCoinmarketcap = {};
var _dequanto_src_tokens_TokenProviders_TPConfig = {};
var _dequanto_src_tokens_TokenProviders_TPExplorer = {};
var _dequanto_src_tokens_TokenProviders_TPOneInch = {};
var _dequanto_src_tokens_TokenProviders_TPSushiswap = {};
var _dequanto_src_tokens_TokenService = {};
var _dequanto_src_tokens_TokenTransferService = {};
var _dequanto_src_tokens_TokensService = {};
var _dequanto_src_tokens_TokensServiceBsc = {};
var _dequanto_src_tokens_TokensServiceEth = {};
var _dequanto_src_tokens_TokensServiceFactory = {};
var _dequanto_src_tokens_TokensServicePolygon = {};
var _dequanto_src_tokens_TokensServiceXDai = {};
var _dequanto_src_tokens_utils_TokenUtils = {};
var _dequanto_src_txs_TxDataBuilder = {};
var _dequanto_src_txs_TxLogger = {};
var _dequanto_src_txs_TxWriter = {};
var _dequanto_src_txs_receipt_TxLogParser = {};
var _dequanto_src_txs_receipt_TxLogsTransfer = {};
var _dequanto_src_txs_receipt_TxTopicInMemoryProvider = {};
var _dequanto_src_txs_receipt_TxTopicProvider = {};
var _dequanto_src_txs_sig_transports_SigFileTransport = {};
var _dequanto_src_utils__abiParser = {};
var _dequanto_src_utils__abiType = {};
var _dequanto_src_utils__abiUtils = {};
var _dequanto_src_utils__account = {};
var _dequanto_src_utils__address = {};
var _dequanto_src_utils__bigint = {};
var _dequanto_src_utils__block = {};
var _dequanto_src_utils__buffer = {};
var _dequanto_src_utils__class = {};
var _dequanto_src_utils__cli = {};
var _dequanto_src_utils__color = {};
var _dequanto_src_utils__config = {};
var _dequanto_src_utils__const = {};
var _dequanto_src_utils__contract = {};
var _dequanto_src_utils__crypto = {};
var _dequanto_src_utils__date = {};
var _dequanto_src_utils__fn = {};
var _dequanto_src_utils__gas = {};
var _dequanto_src_utils__hex = {};
var _dequanto_src_utils__is = {};
var _dequanto_src_utils__logger = {};
var _dequanto_src_utils__machine = {};
var _dequanto_src_utils__number = {};
var _dequanto_src_utils__path = {};
var _dequanto_src_utils__promise = {};
var _dequanto_src_utils__require = {};
var _dequanto_src_utils__secret = {};
var _dequanto_src_utils__sign = {};
var _dequanto_src_utils__signRaw = {};
var _dequanto_src_utils__txData = {};
var _node_modules_a_di_lib_di = {};
var _node_modules_class_json_lib_class_json = {};
var _src_app_App = {};
var _src_commands_CommandsHandler = {};
var _src_commands_list_CAccount = {};
var _src_commands_list_CAccounts = {};
var _src_commands_list_CBlock = {};
var _src_commands_list_CConfig = {};
var _src_commands_list_CContract = {};
var _src_commands_list_CGas = {};
var _src_commands_list_CHelp = {};
var _src_commands_list_CInfo = {};
var _src_commands_list_CInit = {};
var _src_commands_list_CInstall = {};
var _src_commands_list_CReset = {};
var _src_commands_list_CSafe = {};
var _src_commands_list_CToken = {};
var _src_commands_list_CTokens = {};
var _src_commands_list_CTransfer = {};
var _src_commands_list_CTx = {};
var _src_commands_list_CVersion = {};
var _src_commands_utils__command = {};
var _src_services_AccountsService = {};
var _src_services_ContractService = {};
var _src_services_InternalTokenService = {};
var _src_services_PackageService = {};
var _src_utils_Paramsters = {};
var _src_utils__cli = {};
var _src_utils__console = {};
var _src_utils__path = {};
var _src_utils__tx = {};
var _src_utils__validate = {};

// source ./ModuleSimplified.js
var _node_modules_a_di_lib_di;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_a_di_lib_di != null ? _node_modules_a_di_lib_di : {};
    var module = { exports: exports };

    (function (root, factory) {
    'use strict';


    var _name = 'di',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_global, _module, _module.exports);

    if (_global[_name] == null) {
        _global[_name] = _module.exports;
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
        return;
    }
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
    }

}(this, function (global, module, exports) {
    'use strict';

    var _src_Di = {};
var _src_Entries_BaseMethodEntry = {};
var _src_Entries_Entry = {};
var _src_Entries_EntryCollection = {};
var _src_Entries_FnEntry = {};
var _src_Entries_MetaReader = {};
var _src_Entries_ObjectEntry = {};
var _src_Entries_TypeEntry = {};
var _src_Params_BaseParamResolver = {};
var _src_Params_EmptyParamResolver = {};
var _src_Params_ObjectParamResolver = {};
var _src_Params_ParamResolver = {};
var _src_TypeMeta = {};
var _src_const = {};
var _src_deco = {};
var _src_utils_is = {};

// source ./ModuleSimplified.js
var _src_const;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opts = void 0;
exports.Opts = {
    /**
     * How to handle the arguments passed to the wrapped function
     */
    args: {
        OVERRIDE: 'override',
        IGNORE: 'ignore',
        EXTEND: 'extend'
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_const) && isObject(module.exports)) {
		Object.assign(_src_const, module.exports);
		return;
	}
	_src_const = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Is = void 0;
exports.Is = {
    Object: function (mix) {
        return mix != null
            && typeof mix === 'object'
            && mix.toString() === '[object Object]';
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_is) && isObject(module.exports)) {
		Object.assign(_src_utils_is, module.exports);
		return;
	}
	_src_utils_is = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_EmptyParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyParamResolver = void 0;
var EmptyParamResolver = /** @class */ (function () {
    function EmptyParamResolver() {
    }
    EmptyParamResolver.prototype.resolve = function (current) {
        return current;
    };
    return EmptyParamResolver;
}());
exports.EmptyParamResolver = EmptyParamResolver;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_EmptyParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_EmptyParamResolver, module.exports);
		return;
	}
	_src_Params_EmptyParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ObjectParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectParamResolver = void 0;
var is_1 = _src_utils_is;
var ObjectParamResolver = /** @class */ (function () {
    function ObjectParamResolver(di, object) {
        this.object = object;
        this.entries = di.entries;
    }
    ObjectParamResolver.prototype.resolve = function (currentParam) {
        if (currentParam !== null && is_1.Is.Object(currentParam) === false) {
            throw new Error('Object is expected to extend the resultig one');
        }
        var out = Object.create(this.object);
        for (var key in out) {
            out[key] = this.entries.resolve(out[key]);
        }
        for (var key in currentParam) {
            out[key] = currentParam[key];
        }
        return out;
    };
    return ObjectParamResolver;
}());
exports.ObjectParamResolver = ObjectParamResolver;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_ObjectParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_ObjectParamResolver, module.exports);
		return;
	}
	_src_Params_ObjectParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_BaseParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParamResolver = void 0;
var BaseParamResolver = /** @class */ (function () {
    function BaseParamResolver(di, mix) {
        this.entry = di.entries.getFor(mix, true);
    }
    BaseParamResolver.prototype.resolve = function (currentParam) {
        if (currentParam != null) {
            return currentParam;
        }
        return this.entry.resolve();
    };
    return BaseParamResolver;
}());
exports.BaseParamResolver = BaseParamResolver;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_BaseParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_BaseParamResolver, module.exports);
		return;
	}
	_src_Params_BaseParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Params_ParamResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamResolver = void 0;
var is_1 = _src_utils_is;
var EmptyParamResolver_1 = _src_Params_EmptyParamResolver;
var ObjectParamResolver_1 = _src_Params_ObjectParamResolver;
var BaseParamResolver_1 = _src_Params_BaseParamResolver;
exports.ParamResolver = {
    create: function (di, mix) {
        if (mix == null) {
            return new EmptyParamResolver_1.EmptyParamResolver();
        }
        if (is_1.Is.Object(mix)) {
            return new ObjectParamResolver_1.ObjectParamResolver(di, mix);
        }
        return new BaseParamResolver_1.BaseParamResolver(di, mix);
    },
    createMany: function (di, arr) {
        var out = new Array(arr.length), i = arr.length;
        while (--i !== -1) {
            out[i] = exports.ParamResolver.create(di, arr[i]);
        }
        return out;
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Params_ParamResolver) && isObject(module.exports)) {
		Object.assign(_src_Params_ParamResolver, module.exports);
		return;
	}
	_src_Params_ParamResolver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_Entry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
var const_1 = _src_const;
var ParamResolver_1 = _src_Params_ParamResolver;
var Entry = /** @class */ (function () {
    function Entry(di) {
        this.di = di;
        this._as = [];
        this._using = [];
        this._params = [];
        this._resolvers = [];
        this._meta = null;
        this.cfg_arguments = const_1.Opts.args.OVERRIDE;
        this.cfg_singleton = true;
        this.onActivatedCb = null;
    }
    Entry.prototype.config = function (key, value) {
        var prop = "cfg_" + key;
        if (this[prop] === void 0) {
            throw new Error('Configuration key is not supported: ' + key);
        }
        this[prop] = value;
        return this;
    };
    Entry.prototype.using = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._using).push.apply(_a, args);
        var resolvers = new Array(args.length);
        var imax = args.length;
        var i = -1;
        while (++i < imax) {
            resolvers[i] = ParamResolver_1.ParamResolver.create(this.di, args[i]);
        }
        (_b = this._resolvers).push.apply(_b, resolvers);
        return this;
    };
    Entry.prototype.isSingleton = function (val) {
        if (val === void 0) { val = true; }
        this.cfg_singleton = val;
        return this;
    };
    Entry.prototype.for = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.as.apply(this, args);
    };
    Entry.prototype.as = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._as).push.apply(_a, args);
        var i = args.length, entries = this.di.entries;
        while (--i > -1) {
            entries.registerFor(args[i], this);
        }
        return this;
    };
    Entry.prototype.register = function () {
        var coll = this.di.entries;
        var Entry = this.Entry();
        coll.removeFor(Entry);
        coll.registerFor(Entry, this);
        coll.add(this);
        return this;
    };
    Entry.prototype.asSelf = function () {
        this.di.entries.registerFor(this.Entry(), this);
        return this;
    };
    Entry.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error('Not implemented');
    };
    Entry.prototype.onActivated = function (fn) {
        this.onActivatedCb = fn;
    };
    Entry.prototype.Entry = function () {
        throw new Error('Not implemented');
    };
    return Entry;
}());
exports.Entry = Entry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_Entry) && isObject(module.exports)) {
		Object.assign(_src_Entries_Entry, module.exports);
		return;
	}
	_src_Entries_Entry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_TypeMeta;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMeta = void 0;
var TypeMeta;
(function (TypeMeta) {
    var map = new Map();
    function defineParam(Ctor, opts, index) {
        var meta = ensureMeta(Ctor);
        meta.params[index] = opts;
    }
    TypeMeta.defineParam = defineParam;
    function pickMeta(Ctor) {
        return map.get(Ctor);
    }
    function ensureMeta(Ctor) {
        var current = map.get(Ctor);
        if (current == null) {
            current = { params: [] };
            map.set(Ctor, current);
        }
        return current;
    }
    function prepairMeta(Ctor) {
        var meta = ensureMeta(Ctor);
        meta.hasSingletonParams = meta.params.some(function (x) { return x === null || x === void 0 ? void 0 : x.singleton; });
        return meta;
    }
    TypeMeta.prepairMeta = prepairMeta;
})(TypeMeta = exports.TypeMeta || (exports.TypeMeta = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_TypeMeta) && isObject(module.exports)) {
		Object.assign(_src_TypeMeta, module.exports);
		return;
	}
	_src_TypeMeta = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_BaseMethodEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMethodEntry = void 0;
var Entry_1 = _src_Entries_Entry;
var const_1 = _src_const;
var TypeMeta_1 = _src_TypeMeta;
var BaseMethodEntry = /** @class */ (function (_super) {
    __extends(BaseMethodEntry, _super);
    function BaseMethodEntry(di, Entry) {
        var _this = _super.call(this, di) || this;
        if (typeof Entry !== 'function') {
            throw new Error('Invalid argument. Function expected');
        }
        var using = di.metaReader.readFromType(Entry);
        if (using != null) {
            _this.using.apply(_this, using);
        }
        return _this;
    }
    BaseMethodEntry.prototype.withParams = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._params = args;
        return this;
    };
    BaseMethodEntry.prototype.getParams_ = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Entry = this.Entry();
        var resolvers = this._resolvers;
        var params = this._params;
        var meta = (_a = this._meta) !== null && _a !== void 0 ? _a : (this._meta = TypeMeta_1.TypeMeta.prepairMeta(Entry));
        var argsIgnore = this.cfg_arguments === const_1.Opts.args.IGNORE;
        var argsExtend = this.cfg_arguments === const_1.Opts.args.EXTEND;
        var argsOverride = this.cfg_arguments === const_1.Opts.args.OVERRIDE;
        var size = resolvers.length;
        if (size < params.length) {
            size = params.length;
        }
        if (size < Entry.length) {
            size = Entry.length;
        }
        var argsLength = args.length;
        for (var i_1 = argsLength - 1; i_1 >= 0; i_1--) {
            // ignore tail arguments when provided as nulls
            if (args[i_1] != null) {
                break;
            }
            argsLength = i_1;
        }
        if (argsIgnore === false) {
            if (argsExtend) {
                size += argsLength;
            }
            if (argsOverride && argsLength > size) {
                size = argsLength;
            }
        }
        var ctorParams = new Array(size);
        var i = -1;
        while (++i < size) {
            var arg = null;
            if (i < params.length && params[i] != null) {
                arg = argsIgnore === false && i < argsLength && args[i] != null
                    ? args[i]
                    : params[i];
            }
            if (arg == null && i < resolvers.length && resolvers[i] != null) {
                var currentArg = argsIgnore === false && i < argsLength
                    ? args[i]
                    : void 0;
                arg = resolvers[i].resolve(currentArg);
            }
            if (arg == null && i < meta.params.length && meta.params[i] != null) {
                var paramMeta = meta.params[i];
                if (paramMeta === null || paramMeta === void 0 ? void 0 : paramMeta.Type) {
                    arg = this.di.resolve(paramMeta.Type);
                }
            }
            if (arg != null) {
                ctorParams[i] = arg;
                continue;
            }
            if (argsIgnore) {
                continue;
            }
            if (argsOverride && i < argsLength) {
                ctorParams[i] = args[i];
                continue;
            }
            if (argsExtend && i >= size - argsLength) {
                var j = i - size - argsLength;
                ctorParams[i] = args[j];
                continue;
            }
        }
        return ctorParams;
    };
    return BaseMethodEntry;
}(Entry_1.Entry));
exports.BaseMethodEntry = BaseMethodEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_BaseMethodEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_BaseMethodEntry, module.exports);
		return;
	}
	_src_Entries_BaseMethodEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_TypeEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = exports.TypeEntry = void 0;
var BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
var TypeMeta_1 = _src_TypeMeta;
var TypeEntry = /** @class */ (function (_super) {
    __extends(TypeEntry, _super);
    function TypeEntry(di, Type) {
        var _this = _super.call(this, di, Type) || this;
        _this._holder = new SingletonsHolder();
        _this.Type = Type;
        return _this;
    }
    TypeEntry.prototype.Entry = function () {
        return this.Type;
    };
    TypeEntry.prototype.resolve = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Ctor = this.Type;
        if (this._meta == null) {
            this._meta = TypeMeta_1.TypeMeta.prepairMeta(Ctor);
        }
        var params = this.getParams_.apply(this, args);
        var paramsKey = null;
        if (this.cfg_singleton === true) {
            if (this._meta.hasSingletonParams) {
                var singletonArgs = [];
                var paramsMeta = this._meta.params;
                for (var i = 0; i < paramsMeta.length && i < params.length; i++) {
                    if ((_a = paramsMeta[i]) === null || _a === void 0 ? void 0 : _a.singleton) {
                        singletonArgs.push(params[i]);
                    }
                }
                paramsKey = this._holder.createKey(singletonArgs);
            }
            else if (args.length > 0) {
                paramsKey = this._holder.createKey(args);
            }
            var singleton = this._holder.getByKey(paramsKey);
            if (singleton != null) {
                return singleton;
            }
        }
        var instance = new (Ctor.bind.apply(Ctor, __spreadArrays([void 0], params)))();
        if (this.cfg_singleton === true) {
            this._holder.saveByKey(paramsKey, instance);
        }
        return instance;
    };
    TypeEntry.prototype.wrap = function () {
        var self = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return self.resolve.apply(self, args);
        };
    };
    return TypeEntry;
}(BaseMethodEntry_1.BaseMethodEntry));
exports.TypeEntry = TypeEntry;
;
var Args;
(function (Args) {
    var WARN_KEY_LENGTH = 1024;
    var MAX_LEVEL = 2;
    function getKey(args, level) {
        if (level === void 0) { level = 0; }
        var key = '';
        for (var i = 0; i < args.length; i++) {
            key += '.' + getKeySingle(args[i], level);
        }
        if (key.length > WARN_KEY_LENGTH) {
            console.error("DI: Singleton by arguments has the keylength of " + key.length + "c. Consider to use lightweight objects. " + key);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc, level) {
        if (level === void 0) { level = 0; }
        if (misc == null || typeof misc === 'function') {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc, level);
        }
        if (level >= MAX_LEVEL) {
            return "l_" + level;
        }
        var str = '';
        for (var key in misc) {
            var val = misc[key];
            var partial = getKeySingle(val, level + 1);
            if (partial != null && partial !== '') {
                str += '.' + partial;
            }
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
var SingletonsHolder = /** @class */ (function () {
    function SingletonsHolder() {
        this.singletonsByKey = new Map();
        this.singletonsByComplex = [];
    }
    SingletonsHolder.prototype.saveByKey = function (key, val) {
        if (key == null) {
            this.singleton = val;
            return;
        }
        if (typeof key === 'string') {
            this.singletonsByKey.set(key, val);
            return;
        }
        this.singletonsByComplex.push([key, val]);
    };
    SingletonsHolder.prototype.getByKey = function (key) {
        if (key == null) {
            return this.singleton;
        }
        if (typeof key === 'string') {
            return this.singletonsByKey.get(key);
        }
        var arrSingles = this.singletonsByComplex;
        var keyArr = key;
        outer: for (var i = 0; i < arrSingles.length; i++) {
            var _a = arrSingles[i], checkKey = _a[0], val = _a[1];
            if (checkKey.length !== keyArr.length) {
                continue;
            }
            for (var j = 0; j < keyArr.length; j++) {
                if (keyArr[j] !== checkKey[j]) {
                    continue outer;
                }
            }
            return val;
        }
        return null;
    };
    SingletonsHolder.prototype.createKey = function (args) {
        var _a;
        if (args == null || args.length === 0) {
            return null;
        }
        var argsLength = args.length;
        for (var i = argsLength - 1; i >= 0; i--) {
            // ignore tail arguments when provided as nulls
            if (args[i] != null) {
                break;
            }
            argsLength = i;
        }
        var key;
        var arr;
        var isComplex = false;
        for (var i = 0; i < argsLength; i++) {
            var val = (_a = args[i]) !== null && _a !== void 0 ? _a : '';
            if (isComplex) {
                arr.push(val);
                continue;
            }
            if (val instanceof Date) {
                val = val.getTime();
            }
            if (typeof val === 'function') {
                continue;
            }
            if (typeof val !== 'object') {
                key = key == null ? String(val) : key + "." + val;
                continue;
            }
            if (Array.isArray(val) || val.constructor === Object || val.constructor == null) {
                // Simple object?
                var objectKey = ToKey.toKey(val);
                if (objectKey != null) {
                    key = key == null ? String(objectKey) : key + "." + objectKey;
                    continue;
                }
            }
            isComplex = true;
            arr = key == null ? [val] : [key, val];
        }
        return isComplex ? arr : key;
    };
    return SingletonsHolder;
}());
var ToKey;
(function (ToKey) {
    var MAX_DEEP = 3;
    var MAX_ARR_LENGTH = 50;
    function fromObject(obj, level) {
        if (level === void 0) { level = 0; }
        if (level > MAX_DEEP) {
            return null;
        }
        var key = '';
        for (var prop in obj) {
            var val = obj[prop];
            if (val == null || typeof val === 'function') {
                continue;
            }
            var nextKey = toKey(val, level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : key + "." + nextKey;
        }
        return key;
    }
    function fromArray(arr, level) {
        if (level === void 0) { level = 0; }
        if (level > MAX_DEEP || (arr === null || arr === void 0 ? void 0 : arr.length) > MAX_ARR_LENGTH) {
            return null;
        }
        if (arr.length === 0) {
            return '';
        }
        var key = null;
        for (var i = 0; i < arr.length; i++) {
            var nextKey = toKey(arr[i], level);
            if (nextKey == null) {
                return null;
            }
            key = key === '' ? nextKey : key + "." + nextKey;
        }
        return key;
    }
    function toKey(mix, level) {
        if (level === void 0) { level = 0; }
        if (level > MAX_DEEP) {
            return null;
        }
        if (mix == null || typeof mix === 'function') {
            return '';
        }
        if (typeof mix !== 'object') {
            return String(mix);
        }
        if (mix instanceof Date) {
            return String(mix.getTime());
        }
        if (mix instanceof RegExp) {
            return mix.toString();
        }
        if (Array.isArray(mix)) {
            return fromArray(mix, level + 1);
        }
        return fromObject(mix, level + 1);
    }
    ToKey.toKey = toKey;
})(ToKey || (ToKey = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_TypeEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_TypeEntry, module.exports);
		return;
	}
	_src_Entries_TypeEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_EntryCollection;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryCollection = void 0;
var TypeEntry_1 = _src_Entries_TypeEntry;
var EntryCollection = /** @class */ (function () {
    function EntryCollection(di) {
        this.di = di;
        this.arr = [];
        this.ids = {};
        this.types = {};
    }
    EntryCollection.prototype.add = function (entry) {
        this.arr.push(entry);
    };
    EntryCollection.prototype.resolve = function (mix) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (mix == null) {
            throw new Error('Resolve argument is undefined');
        }
        var entry = null;
        if (typeof mix === 'string') {
            entry = this.ids[mix];
            if (entry == null) {
                throw Error("Entry for Type '" + mix + "' not found");
            }
        }
        if (typeof mix === 'function') {
            entry = this.getForType(mix);
            if (entry == null) {
                entry = new TypeEntry_1.TypeEntry(this.di, mix);
                this.registerFor(mix, entry);
            }
        }
        return entry.resolve.apply(entry, args);
    };
    EntryCollection.prototype.getByType = function (Type) {
        var arr = this.arr;
        var i = arr.length;
        while (--i > -1) {
            var x = arr[i];
            if (x.Type === Type) {
                return x;
            }
        }
        return null;
    };
    EntryCollection.prototype.getFor = function (mix, required) {
        if (required === void 0) { required = false; }
        if (typeof mix === 'string') {
            var entry = this.ids[mix];
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix + "\"");
            }
            return entry;
        }
        if (typeof mix === 'function') {
            var entry = this.getForType(mix);
            if (required === true && entry == null) {
                throw Error("Dependency is not registered \"" + mix.name + "\"");
            }
            return entry;
        }
        throw new Error('Collection::getFor. Unsupported value type: ' + (typeof mix));
    };
    EntryCollection.prototype.getForType = function (Type) {
        var _a;
        var name = Type.name;
        var arr = this.types[name];
        if (arr != null) {
            var i = arr.length;
            while (--i > -1) {
                var x = arr[i];
                if (x.Type === Type) {
                    return x.entry;
                }
            }
        }
        return (_a = this.di.parent) === null || _a === void 0 ? void 0 : _a.entries.getForType(Type);
    };
    EntryCollection.prototype.removeForType = function (Type) {
        var arr = this.types[Type.name];
        if (arr == null) {
            return;
        }
        var imax = arr.length, i = -1;
        while (++i < imax) {
            var x = arr[i];
            if (x.Type === Type) {
                arr.splice(i, 1);
                return;
            }
        }
    };
    EntryCollection.prototype.removeFor = function (mix) {
        if (typeof mix === 'string') {
            this.ids[mix] = null;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                return;
            }
            var i = arr.length;
            while (--i !== -1) {
                if (arr[i].Type === mix) {
                    arr.splice(i, 1);
                }
            }
            return;
        }
    };
    EntryCollection.prototype.removeAll = function () {
        this.types = {};
        this.arr = [];
    };
    EntryCollection.prototype.registerFor = function (mix, entry) {
        if (typeof mix === 'string') {
            this.ids[mix] = entry;
            return;
        }
        if (typeof mix === 'function') {
            var name = mix.name;
            var arr = this.types[name];
            if (arr == null) {
                arr = this.types[name] = [];
            }
            arr.push({
                Type: mix,
                entry: entry
            });
            return;
        }
        throw Error('Collection::registerFor. Unsupported value type: ' + (typeof mix));
    };
    return EntryCollection;
}());
exports.EntryCollection = EntryCollection;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_EntryCollection) && isObject(module.exports)) {
		Object.assign(_src_Entries_EntryCollection, module.exports);
		return;
	}
	_src_Entries_EntryCollection = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_MetaReader;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaReader = void 0;
var MetaReader = /** @class */ (function () {
    function MetaReader() {
    }
    MetaReader.prototype.readFromType = function (Type) {
        return Type.$constructor;
    };
    return MetaReader;
}());
exports.MetaReader = MetaReader;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_MetaReader) && isObject(module.exports)) {
		Object.assign(_src_Entries_MetaReader, module.exports);
		return;
	}
	_src_Entries_MetaReader = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_FnEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnEntry = void 0;
var BaseMethodEntry_1 = _src_Entries_BaseMethodEntry;
var FnEntry = /** @class */ (function (_super) {
    __extends(FnEntry, _super);
    function FnEntry(di, fn) {
        var _this = _super.call(this, di, fn) || this;
        _this.Fn = fn;
        return _this;
    }
    FnEntry.prototype.Entry = function () {
        return this.Fn;
    };
    FnEntry.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = this.getParams_.apply(this, args);
        return this.Fn.apply(null, params);
    };
    FnEntry.prototype.wrap = function () {
        return this.resolve.bind(this);
    };
    return FnEntry;
}(BaseMethodEntry_1.BaseMethodEntry));
exports.FnEntry = FnEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_FnEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_FnEntry, module.exports);
		return;
	}
	_src_Entries_FnEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Entries_ObjectEntry;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectEntry = void 0;
var Entry_1 = _src_Entries_Entry;
var ParamResolver_1 = _src_Params_ParamResolver;
var ObjectEntry = /** @class */ (function (_super) {
    __extends(ObjectEntry, _super);
    function ObjectEntry(di, object) {
        var _this = _super.call(this, di) || this;
        _this.Object = object;
        return _this;
    }
    ObjectEntry.prototype.using = function (objectDefinitions) {
        if (arguments.length !== 1) {
            throw new Error('Invalid argument count in using for an ObjectEntry');
        }
        for (var key in objectDefinitions) {
            var paramResolver = ParamResolver_1.ParamResolver.create(this.di, objectDefinitions[key]);
            this.resolvers.push([key, paramResolver]);
        }
        return this;
    };
    ObjectEntry.prototype.resolve = function (currentObject) {
        if (this.cfg_singleton) {
            return this.Object;
        }
        var object = Object.create(this.Object);
        var arr = this.resolvers, i = arr.length;
        while (--i > -1) {
            var resolverEntry = this.resolvers[i];
            var key = resolverEntry[0], Resolver = resolverEntry[1];
            var arg = currentObject == null ? null : currentObject[key];
            var val = Resolver.resolve(arg);
            object[key] = val;
        }
        for (var name in currentObject) {
            if (object[name] == null) {
                object[name] = currentObject[name];
            }
        }
        return object;
    };
    ObjectEntry.prototype.wrap = function () {
        return this.resolve.bind(this);
    };
    ObjectEntry.prototype.Entry = function () {
        return this.Object;
    };
    return ObjectEntry;
}(Entry_1.Entry));
exports.ObjectEntry = ObjectEntry;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Entries_ObjectEntry) && isObject(module.exports)) {
		Object.assign(_src_Entries_ObjectEntry, module.exports);
		return;
	}
	_src_Entries_ObjectEntry = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_for = exports.deco_param = void 0;
var TypeMeta_1 = _src_TypeMeta;
function deco_param(mix) {
    var opts;
    if (mix == null) {
        opts = {};
    }
    else if (typeof mix === 'function') {
        opts = {
            Type: mix
        };
    }
    else if (typeof mix === 'object') {
        opts = mix;
    }
    return function (target, propertyKey, index) {
        TypeMeta_1.TypeMeta.defineParam(target, opts, index);
    };
}
exports.deco_param = deco_param;
function deco_for(mix) {
    var di = this;
    return function (target) {
        di.registerType(target).as(mix);
        return target;
    };
}
exports.deco_for = deco_for;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco) && isObject(module.exports)) {
		Object.assign(_src_deco, module.exports);
		return;
	}
	_src_deco = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Di;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Di = void 0;
var EntryCollection_1 = _src_Entries_EntryCollection;
var MetaReader_1 = _src_Entries_MetaReader;
var TypeEntry_1 = _src_Entries_TypeEntry;
var FnEntry_1 = _src_Entries_FnEntry;
var ObjectEntry_1 = _src_Entries_ObjectEntry;
var deco_1 = _src_deco;
var Di = /** @class */ (function () {
    /**
     * @param parent Optionaly pass the parent container
     */
    function Di(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        /** Container for registered Types */
        this.entries = new EntryCollection_1.EntryCollection(this);
        /** Reader to get meta information from a Type */
        this.metaReader = new MetaReader_1.MetaReader();
        /** Alias for `inject`*/
        this.param = deco_1.deco_param;
        this.inject = deco_1.deco_param;
        //static for = deco_for;
        /**
         * Class Decorator to specify for which type is this implementation
         * ```
         * @di.for(AFoo)
         * class Foo {}
         * ```
         */
        this.for = deco_1.deco_for;
        /** Supports import di from 'a-di' */
        this.default = this;
        /** Supports import {  di } from 'a-di' */
        this.di = this;
    }
    /** Create new Di scope using current di as the parent container */
    Di.prototype.new = function () {
        return new Di(this);
    };
    /**
     * Create and register a Type: create mapping, aliases, etc
     * Example: `di.registerType(Foo).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the registration flow
     */
    Di.prototype.registerType = function (Type) {
        return this.Type(Type).register();
    };
    /**
     * Manually start registering a Type Factory
     * Example: `di.registerFactory(di => { return SomeInstance; }).as(IFoo)`
     * @param Type
     * @returns TypeEntry to continue the configuration flow
     */
    Di.prototype.registerFactory = function (Fn) {
        return this.Factory(Fn).register();
    };
    /**
     * Creates a Type, same as `registerType` but doesn't register within this Di context
     */
    Di.prototype.Type = function (Type) {
        return new TypeEntry_1.TypeEntry(this, Type);
    };
    Di.prototype.Factory = function (fn) {
        return new FnEntry_1.FnEntry(this, fn);
    };
    Di.prototype.Object = function (object) {
        return new ObjectEntry_1.ObjectEntry(this, object);
    };
    Di.prototype.resolve = function (mix) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.entries).resolve.apply(_a, __spreadArrays([mix], args));
    };
    Di.prototype.wrapType = function (Type) {
        return this.entries.getFor(Type).wrap();
    };
    /** Alias for `inject`*/
    Di.param = deco_1.deco_param;
    Di.inject = deco_1.deco_param;
    /** Supports import { Di } from 'a-di' */
    Di.Di = Di;
    /** Supports import { di } from 'a-di' */
    Di.di = new Di;
    /** Supports import di from 'a-di' */
    Di.default = Di.di;
    return Di;
}());
exports.Di = Di;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Di) && isObject(module.exports)) {
		Object.assign(_src_Di, module.exports);
		return;
	}
	_src_Di = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var Di_1 = _src_Di;
var di = Di_1.Di.di;
module.exports = di;


}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_a_di_lib_di === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_a_di_lib_di) && __isObj(module.exports)) {
        Object.assign(_node_modules_a_di_lib_di, module.exports);
    } else {
        _node_modules_a_di_lib_di = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__machine;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__machine != null ? _dequanto_src_utils__machine : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$machine = void 0;
var $machine;
(function ($machine) {
    function id(original = false) {
        return new Promise((resolve, reject) => {
            const { exec } = require('child_process');
            return exec(getCommand(), {}, (err, stdout, stderr) => {
                if (err) {
                    return reject(new Error(`Error while obtaining machine id: ${err.stack}`));
                }
                let id = extractId(stdout.toString());
                return resolve(original ? id : hash(id));
            });
        });
    }
    $machine.id = id;
    function hash(guid) {
        const { createHash } = require('crypto');
        return createHash('sha256').update(guid).digest('hex');
    }
    function getCommand() {
        let { platform } = process;
        let win32RegBinPath = {
            native: '%windir%\\System32',
            mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32'
        };
        let guid = {
            darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
            win32: `${win32RegBinPath[isWindowsProcessMixedOrNativeArchitecture()]}\\REG.exe ` +
                'QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography ' +
                '/v MachineGuid',
            linux: '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
            freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid'
        };
        function isWindowsProcessMixedOrNativeArchitecture() {
            // detect if the node binary is the same arch as the Windows OS.
            // or if this is 32 bit node on 64 bit windows.
            if (process.platform !== 'win32') {
                return '';
            }
            if (process.arch === 'ia32' && process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')) {
                return 'mixed';
            }
            return 'native';
        }
        return guid[platform];
    }
    function extractId(result) {
        switch (process.platform) {
            case 'darwin':
                return result
                    .split('IOPlatformUUID')[1]
                    .split('\n')[0].replace(/\=|\s+|\"/ig, '')
                    .toLowerCase();
            case 'win32':
                return result
                    .toString()
                    .split('REG_SZ')[1]
                    .replace(/\r+|\n+|\s+/ig, '')
                    .toLowerCase();
            case 'linux':
                return result
                    .toString()
                    .replace(/\r+|\n+|\s+/ig, '')
                    .toLowerCase();
            case 'freebsd':
                return result
                    .toString()
                    .replace(/\r+|\n+|\s+/ig, '')
                    .toLowerCase();
            default:
                throw new Error(`Unsupported platform: ${process.platform}`);
        }
    }
})($machine = exports.$machine || (exports.$machine = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__machine === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__machine) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__machine, module.exports);
    } else {
        _dequanto_src_utils__machine = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__secret;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__secret != null ? _dequanto_src_utils__secret : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$secret = void 0;
const _machine_1 = _dequanto_src_utils__machine;
var $secret;
(function ($secret) {
    async function getPin(parameters) {
        let pin = parameters?.pin ?? getPinFromCli() ?? getPinFromEnv();
        if (pin == null || pin.length === 0) {
            return null;
        }
        let id = await _machine_1.$machine.id();
        return `${id}:${pin}`;
    }
    $secret.getPin = getPin;
    function getPinFromCli() {
        let args = process.argv;
        for (let i = 0; i < args.length - 1; i++) {
            let key = args[i].replace(/^\-+/, '');
            if (key === 'p' || key === 'pin') {
                return args[i + 1];
            }
        }
        return null;
    }
    function getPinFromEnv() {
        return process.env.PIN;
    }
})($secret = exports.$secret || (exports.$secret = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__secret === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__secret) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__secret, module.exports);
    } else {
        _dequanto_src_utils__secret = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__cli;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__cli != null ? _dequanto_src_utils__cli : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cli = void 0;
var $cli;
(function ($cli) {
    function getParamValue(flag, parameters) {
        if (parameters != null && parameters[flag] != null) {
            return parameters[flag];
        }
        let args = process.argv;
        for (let i = 0; i < args.length - 1; i++) {
            let key = args[i].replace(/^\-+/, '');
            if (key === flag) {
                return args[i + 1];
            }
        }
        return null;
    }
    $cli.getParamValue = getParamValue;
})($cli = exports.$cli || (exports.$cli = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__cli === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__cli) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__cli, module.exports);
    } else {
        _dequanto_src_utils__cli = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_Config;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_Config != null ? _dequanto_src_Config : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const memd_1 = __importDefault(require("memd"));
const appcfg_1 = __importDefault(require("appcfg"));
const _secret_1 = _dequanto_src_utils__secret;
const _cli_1 = _dequanto_src_utils__cli;
const atma_utils_1 = require("atma-utils");
const atma_io_1 = require("atma-io");
class Config {
    static async fetch(parameters) {
        let unlockedAccountsKey = await _secret_1.$secret.getPin(parameters);
        let configPathAccounts = _cli_1.$cli.getParamValue('config-accounts', parameters) ?? '%APPDATA%/.dequanto/accounts.json';
        let configPathGlobal = _cli_1.$cli.getParamValue('config-global', parameters) ?? '%APPDATA%/.dequanto/config.yml';
        let dequantoConfigs = 'dequanto/configs/';
        let [
        //- inApp,
        inCwd, inNodeModules,] = await Promise.all([
            //- Directory.existsAsync(env.applicationDir.combine(`./${dequantoConfigs}`).toString()),
            atma_io_1.Directory.existsAsync(`./${dequantoConfigs}`),
            atma_io_1.Directory.existsAsync(`./node_modules/${dequantoConfigs}`),
        ]);
        let prfx = '%APP%/';
        if (inNodeModules) {
            prfx = './node_modules/';
        }
        if (inCwd) {
            prfx = './';
        }
        let cfg = await appcfg_1.default.fetch([
            {
                path: `${prfx}${dequantoConfigs}dequanto.yml`,
                optional: true,
            },
            {
                path: `${prfx}${dequantoConfigs}defi.yml`,
                optional: true,
            },
            {
                path: configPathGlobal,
                writable: true,
                optional: true,
                extendArrays: false,
            },
            unlockedAccountsKey ? {
                name: 'accounts',
                path: configPathAccounts,
                writable: true,
                optional: true,
                secret: unlockedAccountsKey
            } : null,
            {
                path: 'package.json',
                getterProperty: 'dequanto',
                optional: true,
            },
            {
                path: 'dequanto.yml',
                optional: true
            },
        ]);
        (0, atma_utils_1.obj_extend)(exports.config, cfg.toJSON());
        return cfg;
    }
    static async extend(json) {
        let current = await Config.fetch();
        await current.$write(json);
    }
}
__decorate([
    memd_1.default.deco.memoize()
], Config, "fetch", null);
exports.Config = Config;
exports.config = new Config();
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_Config === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_Config) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_Config, module.exports);
    } else {
        _dequanto_src_Config = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__is != null ? _dequanto_src_utils__is : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$is = void 0;
var $is;
(function ($is) {
    function Number(val, message = 'Invalid.', opts) {
        if (typeof val !== 'number') {
            throw new Error(`Value is not a number. ${message}`);
        }
        if (opts?.min != null && val < opts.min) {
            throw new Error(`Value ${val} is less than ${opts.min}. ${message}`);
        }
        if (opts?.max != null && val > opts.max) {
            throw new Error(`Value ${val} is greater than ${opts.max}. ${message}`);
        }
        return val;
    }
    $is.Number = Number;
    function notNull(val, message) {
        if (val == null) {
            throw new Error(`Value is undefined. ${message}`);
        }
        return val;
    }
    $is.notNull = notNull;
    function BigInt(val, message) {
        if (typeof val !== 'bigint') {
            throw new Error(`Value is undefined. ${message}`);
        }
        return val;
    }
    $is.BigInt = BigInt;
    function Address(val, message) {
        if (typeof val !== 'string') {
            return false;
        }
        return /^0x[a-fA-F0-9]{40}$/g.test(val);
    }
    $is.Address = Address;
    function TxHash(val) {
        if (hexString(val) === false) {
            return false;
        }
        // 0x115f9d0e3c5d7538eb27466cf42ac68527703a14e93c0d1243131164af2d1c6c
        if (val.length !== 2 + 64) {
            return false;
        }
        return true;
    }
    $is.TxHash = TxHash;
    function hexString(str) {
        if (typeof str !== 'string') {
            return false;
        }
        return /^0x[\da-f]+$/i.test(str);
    }
    $is.hexString = hexString;
})($is = exports.$is || (exports.$is = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__is === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__is) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__is, module.exports);
    } else {
        _dequanto_src_utils__is = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__const;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__const != null ? _dequanto_src_utils__const : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_BROWSER = void 0;
exports.is_BROWSER = typeof window !== 'undefined' && window.navigator?.userAgent != null;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__const === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__const) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__const, module.exports);
    } else {
        _dequanto_src_utils__const = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__color;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__color != null ? _dequanto_src_utils__color : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$color_options = exports.$color = void 0;
const _const_1 = _dequanto_src_utils__const;
let COLOR;
function $color(str) {
    if (COLOR == null) {
        COLOR = _const_1.is_BROWSER
            ? ColorData.ColorNone
            : ColorData.ColorAscii;
    }
    return painter.paint(str, COLOR);
}
exports.$color = $color;
;
function $color_options(opts) {
    COLOR = opts.type === 'none'
        ? ColorData.ColorNone
        : ColorData.ColorAscii;
}
exports.$color_options = $color_options;
;
var ColorData;
(function (ColorData) {
    ColorData.ColorAscii = {
        type: 'ascii',
        START: '\u001b[',
        END: '\u001b[0m',
        value: {
            red: '31m',
            green: '32m',
            yellow: '33m',
            blue: '34m',
            magenta: '35m',
            cyan: '36m',
            white: '37m',
            black: '30m',
            gray: '90m',
            bg_black: '40m',
            bg_red: '41m',
            bg_green: '42m',
            bg_yellow: '43m',
            bg_blue: '44m',
            bg_magenta: '45m',
            bg_cyan: '46m',
            bg_white: '47m',
            bold: '1m',
            italic: '3m',
            underline: '4m',
            inverse: '7m'
        },
        start(key) {
            return this.START + this.value[key];
        },
        rgx_search: null
    };
    ColorData.ColorNone = {
        type: 'none',
        END: '',
        START: '',
        value: {
            red: '',
            green: '',
            yellow: '',
            blue: '',
            magenta: '',
            cyan: '',
            white: '',
            black: '',
            gray: '',
            bg_black: '',
            bg_red: '',
            bg_green: '',
            bg_yellow: '',
            bg_blue: '',
            bg_magenta: '',
            bg_cyan: '',
            bg_white: '',
            bold: '',
            italic: '',
            underline: '',
            inverse: ''
        },
        start: function (key) {
            return '';
        },
        rgx_search: null
    };
})(ColorData || (ColorData = {}));
var painter;
(function (painter) {
    function paint(str, colorData) {
        prepairColor(colorData);
        colorData.rgx_search.lastIndex = 0;
        var match, key, end, doRenew = colorData.type === 'ascii', stack = doRenew && [] || null, txt;
        var out = '', last = 0;
        while (1) {
            match = colorData.rgx_search.exec(str);
            if (match == null)
                break;
            key = match[1];
            if (colorData.value[key] == null)
                continue;
            var index = match.index, bound = index + match[0].length, head, txt;
            if (last !== index)
                out += createRange(str, last, index, colorData);
            end = index_End(str, bound);
            last = end + 1;
            if (end === -1) {
                out += createRange(str, index, end, colorData);
                continue;
            }
            head = colorData.start(key);
            txt = str.substring(bound, end);
            txt = paint(txt, colorData);
            out += head
                + txt
                + colorData.END
                + (doRenew ? stack_renew(stack, end, colorData) : '');
            if (doRenew)
                stack.push({ end: end, key: key });
            colorData.rgx_search.lastIndex = end + 1;
        }
        if (last < str.length) {
            out += createRange(str, last, str.length, colorData);
        }
        return out;
    }
    painter.paint = paint;
    ;
    function createRange(str, start, end, ColorData) {
        var txt = str.substring(start, end);
        if (ColorData.decorator)
            return ColorData.decorator(txt);
        return txt;
    }
    function index_End(str, start) {
        var count = 1, imax = str.length, i = start, c;
        for (; i < imax; i++) {
            c = str.charCodeAt(i);
            if (c === 60 /* < */)
                count++;
            if (c === 62 /* > */)
                count--;
            if (count === 0)
                return i;
        }
        return -1;
    }
    function stack_renew(stack, index, ColorData) {
        var str = '', imax = stack.length, i = -1, x;
        while (++i < imax) {
            x = stack[i];
            if (x.end < index)
                continue;
            str += ColorData.start(x.key);
        }
        return str;
    }
    function prepairColor(colorData) {
        if (colorData.rgx_search == null) {
            var str = '(';
            for (var key in colorData.value) {
                str += str === '(' ? key : '|' + key;
            }
            str += ')<';
            colorData.rgx_search = new RegExp(str, 'g');
        }
        return colorData;
    }
})(painter || (painter = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__color === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__color) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__color, module.exports);
    } else {
        _dequanto_src_utils__color = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__console;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__console != null ? _src_utils__console : {};
    var module = { exports: exports };

    "use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$console = void 0;
const rl = __importStar(require("readline"));
const alot_1 = __importDefault(require("alot"));
const _color_1 = _dequanto_src_utils__color;
var $console;
(function ($console) {
    let std = [];
    function log(str) {
        if (typeof str !== 'string') {
            console.dir(str, { depth: null });
            return;
        }
        write({ str });
    }
    $console.log = log;
    function toast(str) {
        write({ str, isToast: true });
    }
    $console.toast = toast;
    function table(arr) {
        arr = arr.filter(x => x != null && x.length > 0);
        let lengths = arr[0].map((row, i) => {
            let size = (0, alot_1.default)(arr).max(x => {
                let str = String(x[i]);
                let lines = str.split('\n');
                return (0, alot_1.default)(lines).max(x => x.length);
            });
            return size;
        });
        let lines = arr.map(row => {
            let multiLines = row.map(x => String(x).split('\n'));
            let multiLinesCount = (0, alot_1.default)(multiLines).max(x => x.length);
            return alot_1.default
                .fromRange(0, multiLinesCount)
                .map(y => {
                return row.map((_, i) => {
                    let x = multiLines[i][y];
                    let size = lengths[i];
                    let str = String(x ?? '').padEnd(size, ' ');
                    if (i % 2 === 1) {
                        str = `bold<${str}>`;
                    }
                    return str;
                })
                    .join(' ');
            })
                .toArray()
                .join('\n');
        });
        log(lines.join('\n'));
    }
    $console.table = table;
    function write(params) {
        let prev = std[0];
        if (prev?.isToast) {
            rl.clearLine(process.stdout, 0);
            rl.cursorTo(process.stdout, 0, null);
            rl.moveCursor(process.stdout, 0, -1);
            rl.clearLine(process.stdout, 0);
        }
        if (params?.isToast) {
            process.stdout.write((0, _color_1.$color)(params.str) + '\n');
        }
        else {
            console.log((0, _color_1.$color)(params.str));
        }
        std.unshift(params);
        if (std.length > 100) {
            std.splice(50);
        }
    }
})($console = exports.$console || (exports.$console = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__console === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__console) && __isObj(module.exports)) {
        Object.assign(_src_utils__console, module.exports);
    } else {
        _src_utils__console = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__cli;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__cli != null ? _src_utils__cli : {};
    var module = { exports: exports };

    "use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cli = void 0;
const readline = __importStar(require("readline"));
const alot_1 = __importDefault(require("alot"));
const _command_1 = _src_commands_utils__command;
const _is_1 = _dequanto_src_utils__is;
const _console_1 = _src_utils__console;
const _color_1 = _dequanto_src_utils__color;
const atma_utils_1 = require("atma-utils");
var $cli;
(function ($cli) {
    let $argv = process.argv;
    function setParams(argv) {
        $argv = argv;
    }
    $cli.setParams = setParams;
    function getParamValue(flag, params) {
        let args = $argv;
        let aliases = _command_1.$command.getAliases(flag);
        return (0, alot_1.default)(aliases)
            .map(x => {
            let command = toCommand(x.name);
            let valFromParams = params?.[command];
            if (valFromParams != null) {
                return valFromParams;
            }
            let i = args.findIndex(x => toCommand(x) === command);
            if (i > -1) {
                return args[i + 1];
            }
            return null;
        })
            .filter(x => x != null)
            .first();
    }
    $cli.getParamValue = getParamValue;
    function parse(argv) {
        if (argv == null) {
            argv = process.argv;
        }
        let params = {};
        let args = [];
        for (let i = 0; i < argv.length; i++) {
            let x = argv[i];
            if (x[0] === '-') {
                let key = x.replace(/^[\-]+/, '');
                let val;
                if (i < argv.length - 1 && argv[i + 1][0] !== '-') {
                    val = argv[i + 1];
                    i++;
                }
                else {
                    val = true;
                }
                (0, atma_utils_1.obj_setProperty)(params, key, val);
                continue;
            }
            args.push(argv[i]);
        }
        let i = args.findIndex(x => /\bindex(\.(ts|js))?\b/i.test(x));
        if (i > -1) {
            args = args.slice(i + 1);
        }
        return { params, args };
    }
    $cli.parse = parse;
    function ask(question, type) {
        return new Promise(resolve => {
            rl.question((0, _color_1.$color)(question), (answer) => {
                let { error, value } = parseInput(answer, type);
                if (value != null) {
                    resolve(value);
                    return;
                }
                _console_1.$console.log(`red<Input Error:>  ${error.message}`);
                ask(question, type).then(resolve);
            });
        });
    }
    $cli.ask = ask;
    //export function askAbiInput ()
    // remove "-"(s) from start
    function toCommand(flag) {
        return flag.replace(/^\-+/, '');
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function parseInput(input, type) {
        input = input.trim();
        if (!type) {
            return { value: input };
        }
        let rgxArray = /[(\d+)?]$/;
        if (rgxArray.test(type) && isBuffer(type) === false) {
            type = type.replace(rgxArray, '');
            let results = input.split(',').map(x => parseInput(x, type));
            let error = results.find(x => x.error)[0]?.error;
            if (error) {
                return { error };
            }
            return { value: results.map(x => x.value) };
        }
        ;
        if (type === 'address') {
            if (_is_1.$is.Address(input) === false) {
                return { error: new Error(`Not an address`) };
            }
            return { value: input };
        }
        if (/int/.test(type)) {
            let isNumber = /^\-?\d+$/.test(input);
            if (isNumber == false) {
                isNumber = /^0x[a-fA-F0-9]+$/.test(input);
            }
            if (isNumber === false) {
                return { error: new Error(`Not a number`) };
            }
            return { value: BigInt(input) };
        }
        if (isBuffer(type)) {
            let isHex = /^0x[a-fA-F0-9]+$/.test(input);
            if (isHex === false || input.length % 2 !== 0) {
                return { error: new Error(`Invalid HEX buffer string`) };
            }
            return { value: input };
        }
        if (type === 'bool') {
            if (/(true|1|yes)/i.test(input)) {
                return { value: true };
            }
            if (/(false|0|no)/i.test(input)) {
                return { value: false };
            }
            return { error: new Error(`Invalid Boolean. Expects on of: true, 1, yes, false, 0, no`) };
        }
        return { value: input };
    }
    function isBuffer(type) {
        return /byte/.test(type);
    }
})($cli = exports.$cli || (exports.$cli = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__cli === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__cli) && __isObj(module.exports)) {
        Object.assign(_src_utils__cli, module.exports);
    } else {
        _src_utils__cli = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_utils__command;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_utils__command != null ? _src_commands_utils__command : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$command = void 0;
const _cli_1 = _src_utils__cli;
var $command;
(function ($command) {
    /** e.g. "i, install" or "-n, --name" */
    function getAliases(str) {
        return str
            .split(',')
            .map(x => x.trim())
            .map(x => {
            let name = x.replace(/^\-+/, '');
            let isFlag = x !== name;
            return {
                name,
                isFlag
            };
        });
    }
    $command.getAliases = getAliases;
    async function getParams(cliParams, paramsDef) {
        let params = {};
        let keyMappings = {};
        let definitions = {};
        for (let key in paramsDef) {
            let aliases = getAliases(key);
            let canonical = camelCase(aliases[aliases.length - 1].name);
            paramsDef[key].key = canonical;
            aliases.forEach(alias => {
                keyMappings[alias.name] = canonical;
                definitions[alias.name] = paramsDef[key];
            });
        }
        for (let key in cliParams) {
            let value = cliParams[key];
            let mappedKey = keyMappings[key];
            if (mappedKey == null) {
                params[key] = value;
                continue;
            }
            let def = definitions[key];
            params[mappedKey] = parseValue(value, def);
        }
        for (let key in paramsDef) {
            let definition = paramsDef[key];
            let value = params[definition.key];
            if (value != null) {
                if (definition.map != null) {
                    params[definition.key] = definition.map(value);
                }
            }
            if (value == null && definition.default != null) {
                value = params[definition.key] = definition.default;
            }
            if (value == null && definition.required) {
                params[definition.key] = await _cli_1.$cli.ask(`\n${definition.description}\n--${definition.key}: `, definition.type);
            }
        }
        return params;
    }
    $command.getParams = getParams;
    function camelCase(str) {
        return str.replace(/\-(\w)/g, (full, char) => {
            return char.toUpperCase();
        });
    }
    function parseValue(value, def) {
        if (def.type == null) {
            return value;
        }
        if (def.type === 'number') {
            if (typeof value === 'number') {
                return value;
            }
            let num = Number(value);
            if (isNaN(num)) {
                throw new Error(`Not a number (${value}) for "${def.description}"`);
            }
            return num;
        }
        if (def.type === 'boolean') {
            if (typeof value === 'boolean') {
                return value;
            }
            if (value == null || value === 'true' || value === '1') {
                return true;
            }
            return false;
        }
        return value;
    }
})($command = exports.$command || (exports.$command = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_utils__command === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_utils__command) && __isObj(module.exports)) {
        Object.assign(_src_commands_utils__command, module.exports);
    } else {
        _src_commands_utils__command = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__config;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__config != null ? _dequanto_src_utils__config : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$config = void 0;
const Config_1 = _dequanto_src_Config;
const atma_utils_1 = require("atma-utils");
const $global = typeof global === 'undefined'
    ? window
    : global;
var $config;
(function ($config) {
    let envOptions = null;
    function get(path, $default) {
        let value = (typeof $global.app !== 'undefined' ? $global.app.config?.$get?.(path) : null)
            ?? (0, atma_utils_1.obj_getProperty)(Config_1.config, path)
            ?? (0, atma_utils_1.obj_getProperty)(envOptions, path);
        if (value == null && envOptions == null) {
            envOptions = reloadEnv();
            return get(path, $default);
        }
        return value ?? $default;
    }
    $config.get = get;
    function set(path, value) {
        $global.app.config?.$set?.(path, value);
    }
    $config.set = set;
    function reloadEnv(argv, env) {
        if (argv == null && typeof process !== 'undefined' && process.argv) {
            argv = process.argv;
        }
        if (env == null && typeof process !== 'undefined' && process.env) {
            env = process.env;
        }
        envOptions = {};
        if (argv != null) {
            for (let i = 0; i < argv.length; i++) {
                let key = argv[i];
                let value = argv[i + 1];
                if (key.startsWith('--config=')) {
                    value = key.replace('--config=', '');
                    key = '--config';
                }
                if (key === '--config') {
                    value = trimQuotes(value);
                    if (value === '') {
                        continue;
                    }
                    let [path, val] = value.split('=');
                    (0, atma_utils_1.obj_setProperty)(envOptions, path.trim(), val.trim());
                    i++;
                }
            }
        }
        if (env != null) {
            for (let key in env) {
                if (/DQ_/i.test(key) === false) {
                    continue;
                }
                let path = key.replace(/^dq_/i, '').replace(/__/g, '.').toLowerCase();
                let val = env[key];
                (0, atma_utils_1.obj_setProperty)(envOptions, path, val);
            }
        }
        return envOptions;
    }
    $config.reloadEnv = reloadEnv;
    function trimQuotes(value) {
        value = value?.trim() ?? '';
        let q = /^['"]/.exec(value);
        if (q) {
            return value.substring(1, value.length - 1);
        }
        return value;
    }
})($config = exports.$config || (exports.$config = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__config === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__config) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__config, module.exports);
    } else {
        _dequanto_src_utils__config = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__require;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__require != null ? _dequanto_src_utils__require : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$require = void 0;
const _is_1 = _dequanto_src_utils__is;
var $require;
(function ($require) {
    function Number(val, message = '', opts) {
        if (typeof val !== 'number') {
            throw new Error(`Expects number type, got ${typeof val} ${val}. ${message}`);
        }
        if (isNaN(val)) {
            throw new Error(`Value is Not-a-Number. ${message}`);
        }
        if (opts?.min != null && val < opts.min) {
            throw new Error(`Value ${val} is less than ${opts.min}. ${message}`);
        }
        if (opts?.max != null && val > opts.max) {
            throw new Error(`Value ${val} is greater than ${opts.max}. ${message}`);
        }
        return val;
    }
    $require.Number = Number;
    function BigInt(val, message = '', opts) {
        if (typeof val !== 'bigint') {
            throw new Error(`Expects bigint type, got ${typeof val} (${val}). ${message}`);
        }
        if (opts?.min != null && val < opts.min) {
            throw new Error(`Value ${val} is less than ${opts.min}. ${message}`);
        }
        if (opts?.max != null && val > opts.max) {
            throw new Error(`Value ${val} is greater than ${opts.max}. ${message}`);
        }
        return val;
    }
    $require.BigInt = BigInt;
    function Numeric(val, message = '', opts) {
        if (typeof val === 'number') {
            return Number(val, message, opts);
        }
        if (typeof val === 'bigint') {
            return BigInt(val, message, opts);
        }
        throw new Error(`Expects numeric type, got ${typeof val}. ${message}`);
    }
    $require.Numeric = Numeric;
    function Function(val, message) {
        if (typeof val !== 'function') {
            throw new Error(`Value is not a function`);
        }
        return val;
    }
    $require.Function = Function;
    function notNull(val, message) {
        if (val == null) {
            throw new Error(`Value is undefined. ${message}`);
        }
        return val;
    }
    $require.notNull = notNull;
    function True(value, message) {
        if (value !== true) {
            throw new Error(`Got false expression ${message}`);
        }
    }
    $require.True = True;
    function notEq(a, b, message = '') {
        // not strict equal
        if (a == b) {
            throw new Error(`${a} and ${b} shouldn't be equal. ${message}`);
        }
    }
    $require.notEq = notEq;
    function eq(a, b, message = '') {
        // not strict equal
        if (a != b) {
            throw new Error(`${a} and ${b} should be equal. ${message}`);
        }
    }
    $require.eq = eq;
    function match(rgx, str, message = '') {
        if (typeof str !== 'string') {
            throw new Error(`Expected a string to find in. ${message}`);
        }
        if (rgx.test(str) === false) {
            throw new Error(`Expected string "${str}" to match ${rgx.toString()}. ${message}`);
        }
    }
    $require.match = match;
    function oneOf(a, arr, message = '') {
        // not strict equal
        if (arr.includes(a) === false) {
            throw new Error(`${a} should be one of ${arr.join(', ')}. ${message}`);
        }
    }
    $require.oneOf = oneOf;
    function Address(val, message = '') {
        if (_is_1.$is.Address(val) === false) {
            throw new Error(`Value ${val} is not a valid address. ${message}`);
        }
        return val;
    }
    $require.Address = Address;
    function TxHash(val, message = '') {
        if (_is_1.$is.TxHash(val) === false) {
            throw new Error(`Value ${val} is not a valid tx hash. ${message}`);
        }
        return val;
    }
    $require.TxHash = TxHash;
    function Token(token, message = '') {
        if (token == null) {
            throw new Error(`Token is undefined. ${message}`);
        }
        if (token.address == null) {
            throw new Error(`Token address property is undefined. ${message}`);
        }
        if (token.decimals == null) {
            throw new Error(`Token decimals property is undefined. ${message}`);
        }
        return token;
    }
    $require.Token = Token;
    /**
     * throws when a <= b
     */
    function gt(a, b, message = '') {
        Numeric(a);
        Numeric(b);
        if (a <= b) {
            throw new Error(`Expected a(${a}) > b(${b}). ${message}`);
        }
    }
    $require.gt = gt;
})($require = exports.$require || (exports.$require = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__require === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__require) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__require, module.exports);
    } else {
        _dequanto_src_utils__require = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__validate;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__validate != null ? _src_utils__validate : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$validate = void 0;
const _config_1 = _dequanto_src_utils__config;
const _require_1 = _dequanto_src_utils__require;
const _console_1 = _src_utils__console;
var $validate;
(function ($validate) {
    $validate.platforms = ['eth', 'polygon', 'bsc', 'xdai', 'hardhat'];
    function platform(platform, message) {
        _require_1.$require.notNull(platform, message);
        _require_1.$require.oneOf(platform, $validate.platforms, message);
    }
    $validate.platform = platform;
    let config;
    (function (config) {
        function rpcNodes(platform) {
            let endpoints = _config_1.$config.get(`web3.${platform}.endpoints`);
            if (Array.isArray(endpoints) && endpoints.length > 0 && /^(https?|wss?)/.test(endpoints[0].url)) {
                return;
            }
            let example = {
                web3: {
                    [platform]: {
                        endpoints: [
                            {
                                url: 'https://rpc-node.foo'
                            },
                            {
                                url: 'wss://rpc-node.foo'
                            }
                        ]
                    }
                }
            };
            let msg = `${platform} nodes not configurated. Run "0xweb config -e" and set node urls in web3.${platform}.endpoints`;
            console.error(msg);
            console.error('Current: ', endpoints, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }
        config.rpcNodes = rpcNodes;
        function blockchainExplorer(platform) {
            if (platform === 'hardhat') {
                return;
            }
            let scan = _config_1.$config.get(`blockchainExplorer.${platform}`);
            if (scan?.host && scan?.key) {
                return;
            }
            let example = {
                blockchainExplorer: {
                    [platform]: {
                        host: 'https://api.etherscan.io',
                        key: 'YOUR_API_KEY'
                    }
                }
            };
            let msg = `${platform} blockchain explorer not configurated. Run "0xweb config -e" and set node host and key in web3.${platform}`;
            console.error(msg);
            console.error('Current: ', scan, 'Expected: ');
            console.dir(example, { depth: null });
            throw new Error(msg);
        }
        config.blockchainExplorer = blockchainExplorer;
    })(config = $validate.config || ($validate.config = {}));
    function args(command, args, options) {
        let definition = command.arguments;
        if (definition == null || definition.length === 0) {
            return;
        }
        for (let i = 0; i < definition.length; i++) {
            let def = definition[i];
            if (def.required !== true) {
                return;
            }
            let val = args[i];
            if (val == null) {
                let str = `${def.name ?? i}`;
                if (def.description) {
                    str += ` (${def.description})`;
                }
                throw new Error(`Argument ${str} is required`);
            }
        }
    }
    $validate.args = args;
    function params(command, paramsDef, params) {
        for (let key in paramsDef) {
            let def = paramsDef[key];
            let val = params[key];
            if (Array.isArray(def.oneOf)) {
                _require_1.$require.oneOf(val, def.oneOf);
            }
            if (def.validate) {
                try {
                    def.validate(val);
                }
                catch (error) {
                    _console_1.$console.log(`Parameter '${def.key}' is invalid:`);
                    _console_1.$console.table([
                        ['Info', def.description],
                    ]);
                    throw error;
                }
            }
        }
    }
    $validate.params = params;
})($validate = exports.$validate || (exports.$validate = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__validate === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__validate) && __isObj(module.exports)) {
        Object.assign(_src_utils__validate, module.exports);
    } else {
        _src_utils__validate = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CHelp;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CHelp != null ? _src_commands_list_CHelp : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHelp = void 0;
const _console_1 = _src_utils__console;
const atma_io_1 = require("atma-io");
exports.CHelp = {
    command: 'help, -h, --help',
    description: [
        'Print this overview'
    ],
    async process(args, params, app) {
        let path = atma_io_1.env.applicationDir.combine(`/package.json`).toString();
        let json = await atma_io_1.File.readAsync(path);
        _console_1.$console.log('');
        _console_1.$console.log('bold<green<!>> We provide our Demo Keys for etherscan and co. Please, replace them with yours: bold<yellow<0xweb config -e>>');
        _console_1.$console.log('');
        _console_1.$console.log(`0xweb@${json.version} Commands`);
        _console_1.$console.log('');
        for (let command of app.commands.list) {
            exports.CHelp.printCommand(command);
        }
    },
    printCommand(command, paramsDefinition) {
        let str = print.command({
            ...command,
            params: paramsDefinition ?? void 0
        });
        _console_1.$console.log(str);
    }
};
var print;
(function (print) {
    function command(c, prefix = '') {
        let lines = [];
        lines.push(`yellow<bold<${c.command}>>`);
        lines.push(c.description.map(x => `  ${x}`).join('\n'));
        if (c.arguments?.length > 0) {
            lines.push(`  italic<Arguments>`);
            c.arguments.forEach((arg, i) => {
                lines.push(`    bold<${arg.name ?? i}${arg.required ? '*' : ''}>: ${arg.description}`);
            });
        }
        if (c.subcommands?.length > 0) {
            lines.push(`    gray<Subcommands>`);
            for (let sub of c.subcommands) {
                lines.push(print.command(sub, prefix + '    '));
            }
        }
        if (c.params && Object.keys(c.params).length > 0) {
            lines.push(`  italic<Flags>`);
            for (let key in c.params) {
                let arg = c.params[key];
                lines.push(`    bold<${key}${arg.required ? '*' : ''}>: ${arg.description}`);
            }
        }
        lines.push(``);
        return lines.map(x => `${prefix}${x}`).join('\n');
    }
    print.command = command;
})(print || (print = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CHelp === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CHelp) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CHelp, module.exports);
    } else {
        _src_commands_list_CHelp = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_CommandsHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_CommandsHandler != null ? _src_commands_CommandsHandler : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsHandler = void 0;
const _command_1 = _src_commands_utils__command;
const _validate_1 = _src_utils__validate;
const CHelp_1 = _src_commands_list_CHelp;
class CommandsHandler {
    constructor() {
        this.commands = Object.create(null);
        this.flags = Object.create(null);
        this.list = [];
    }
    register(command) {
        _command_1.$command.getAliases(command.command).map(({ name, isFlag }) => {
            if (isFlag) {
                this.flags[name] = command;
            }
            else {
                this.commands[name] = command;
            }
        });
        this.list.push(command);
        return this;
    }
    async findCommand(cliArgs, cliParams) {
        let name = null;
        let command;
        if (cliArgs.length === 0) {
            name = Object.keys(cliParams)[0];
            command = this.flags[name];
        }
        else {
            name = cliArgs[0];
            command = this.commands[name];
        }
        if (name == null) {
            command = this.commands['help'];
        }
        if (command == null) {
            throw new Error(`Unknown command: ${name}`);
        }
        let args = cliArgs.slice(1);
        let paramsDefinition = command.params ?? {};
        let isHelp = 'help' in cliParams;
        if (command.subcommands) {
            let subCommand = command.subcommands.find(x => x.command === args[0]);
            if (subCommand) {
                args = args.slice(1);
                command = subCommand;
                paramsDefinition = {
                    ...(paramsDefinition ?? {}),
                    ...(subCommand.params ?? {}),
                };
            }
            else {
                if (isHelp === false) {
                    throw new Error(`Subcommand 'bold<${args[0]}>' of 'bold<${name}>' not found`);
                }
            }
        }
        if (isHelp) {
            return { command, paramsDefinition };
        }
        let params = await _command_1.$command.getParams(cliParams, paramsDefinition);
        _validate_1.$validate.args(command, args);
        _validate_1.$validate.params(command, params, paramsDefinition);
        return { command, args, params };
    }
    async process(cliArgs, cliParams, app) {
        let name = null;
        let command;
        if (cliArgs.length === 0) {
            name = Object.keys(cliParams)[0];
            command = this.flags[name];
        }
        else {
            name = cliArgs[0];
            command = this.commands[name];
        }
        if (name == null) {
            command = this.commands['help'];
        }
        if (command == null) {
            throw new Error(`Unknown command: ${name}`);
        }
        if (cliParams.help) {
            let result = await CHelp_1.CHelp.printCommand(command);
            return result;
        }
        let args = cliArgs.slice(1);
        let paramsDefinition = command.params ?? {};
        if (command.subcommands) {
            let subCommand = command.subcommands.find(x => x.command === args[0]);
            if (subCommand == null) {
                throw new Error(`Subcommand 'bold<${args[0]}>' not found`);
            }
            args = args.slice(1);
            command = subCommand;
            paramsDefinition = {
                ...(paramsDefinition ?? {}),
                ...(subCommand.params ?? {}),
            };
        }
        let params = await _command_1.$command.getParams(cliParams, paramsDefinition);
        _validate_1.$validate.args(command, args);
        _validate_1.$validate.params(command, params, paramsDefinition);
        return await command.process(args, params, app);
    }
}
exports.CommandsHandler = CommandsHandler;
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_CommandsHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_CommandsHandler) && __isObj(module.exports)) {
        Object.assign(_src_commands_CommandsHandler, module.exports);
    } else {
        _src_commands_CommandsHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CVersion;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CVersion != null ? _src_commands_list_CVersion : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVersion = void 0;
const _console_1 = _src_utils__console;
const atma_io_1 = require("atma-io");
exports.CVersion = {
    command: '-v, --version',
    description: [
        'Show package version'
    ],
    async process() {
        let path = atma_io_1.env.applicationDir.combine(`/package.json`).toString();
        let json = await atma_io_1.File.readAsync(path);
        _console_1.$console.log(`${json.name}@${json.version}`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CVersion === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CVersion) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CVersion, module.exports);
    } else {
        _src_commands_list_CVersion = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__address;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__address != null ? _dequanto_src_utils__address : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$address = void 0;
const web3_1 = __importDefault(require("web3"));
var $address;
(function ($address) {
    function eq(a1, a2) {
        return a1?.toUpperCase() === a2?.toUpperCase();
    }
    $address.eq = eq;
    function find(arr, getter, address) {
        return arr.find(x => eq(getter(x), address));
    }
    $address.find = find;
    function isValid(address) {
        let rgx = /0x[\dA-F]{40,}/i;
        return rgx.test(address);
    }
    $address.isValid = isValid;
    function isEmpty(address) {
        if (address == null || address === '') {
            return true;
        }
        if (/^0x0+$/.test(address)) {
            return true;
        }
        return false;
    }
    $address.isEmpty = isEmpty;
    function expectValid(address, message) {
        if (isValid(address) === false) {
            throw new Error(`${address} is invalid: ${message}`);
        }
        return address;
    }
    $address.expectValid = expectValid;
    function toBytes32(address) {
        return address.toLowerCase().substring(2).padStart(32, '0');
    }
    $address.toBytes32 = toBytes32;
    function toChecksum(address) {
        return web3_1.default.utils.toChecksumAddress(address);
    }
    $address.toChecksum = toChecksum;
    $address.ZERO = '0x0000000000000000000000000000000000000000';
})($address = exports.$address || (exports.$address = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__address === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__address) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__address, module.exports);
    } else {
        _dequanto_src_utils__address = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__abiType;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__abiType != null ? _dequanto_src_utils__abiType : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$abiType = void 0;
const alot_1 = __importDefault(require("alot"));
var $abiType;
(function ($abiType_1) {
    function getTsType($abiType, $abi) {
        let rgxArray = /\[(?<size>\d+)?\]$/;
        let isArray = rgxArray.test($abiType);
        // fix subarrays
        let rgxSubType = /\[\]\[\d+\]$/;
        if (rgxSubType.test($abiType)) {
            $abiType = $abiType.replace(rgxSubType, '');
        }
        let abiType = isArray
            ? $abiType.replace(rgxArray, '')
            : $abiType;
        let tsType = AbiTsTypes[abiType];
        if (tsType == null) {
            let byRgx = (0, alot_1.default)(AbiTsTypesRgx).map(definition => ({ match: definition.rgx.exec(abiType), definition })).first(x => x.match != null);
            if (byRgx) {
                let { match, definition } = byRgx;
                tsType = definition.fromMatch?.(match) ?? definition.type;
            }
        }
        if (tsType == null && abiType === 'tuple') {
            let components = $abi?.components;
            if (components == null) {
                throw new Error(`Components undefined for tuple ${$abi?.name ?? ''}`);
            }
            let fields = components.map(x => {
                return `${x.name}: ${getTsType(x.type, x)}`;
            }).join(', ');
            tsType = `{ ${fields} }`;
        }
        if (tsType == null) {
            throw new Error(`Unknown abi type in return: ${abiType}`);
        }
        return isArray
            ? `${tsType}[]`
            : `${tsType}`;
    }
    $abiType_1.getTsType = getTsType;
    const AbiTsTypes = {
        'uint': 'number',
        'int': 'number',
        'bool': 'boolean',
        'bytes': 'TBufferLike',
        'bytes4': 'TBufferLike',
        'bytes32': 'TBufferLike',
        'bytes64': 'TBufferLike',
        'bytes128': 'TBufferLike',
        'bytes256': 'TBufferLike',
        'address': 'TAddress',
        'string': 'string',
    };
    const AbiTsTypesRgx = [
        {
            rgx: /u?int(?<bits>\d+)/,
            fromMatch(match) {
                let bits = Number(match.groups.bits);
                if (bits > 64) {
                    return 'bigint';
                }
                return 'number';
            },
            type: null,
        },
        // {
        //     rgx: /uint\d+/,
        //     type: 'bigint',
        // }
    ];
})($abiType = exports.$abiType || (exports.$abiType = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__abiType === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__abiType) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__abiType, module.exports);
    } else {
        _dequanto_src_utils__abiType = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__date;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__date != null ? _dequanto_src_utils__date : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$date = exports.DateTool = void 0;
class DateTool {
    constructor(date = new Date()) {
        this.date = date;
    }
    /**
     * - DD-MM-YYYYY (HH:mm)?
     * - DD.MM.YYYYY (HH:mm)?
     * - ISODate
     * - Ticks
     */
    static with(mix) {
        let date;
        if (typeof mix === 'string' || typeof mix === 'number') {
            date = $date.parse(mix);
        }
        else {
            date = mix;
        }
        return new DateTool(date);
    }
    static withNow() {
        return new DateTool();
    }
    clone() {
        this.date = new Date(this.date);
        return this;
    }
    add(x) {
        this.date = $date.additive(this.date, x);
        return this;
    }
    dayStart() {
        this.date = $date.dayStart(this.date);
        return this;
    }
    dayEnd() {
        this.date = $date.dayEnd(this.date);
        return this;
    }
    weekStart() {
        this.date = $date.weekStart(this.date);
        return this;
    }
    weekEnd() {
        this.date = $date.weekEnd(this.date);
        return this;
    }
    monthStart() {
        this.date = $date.monthStart(this.date);
        return this;
    }
    monthEnd() {
        this.date = $date.monthEnd(this.date);
        return this;
    }
    daysBetween(b) {
        return $date.daysBetween(this.date, b);
    }
    /** e.g. yyyy-MM-dd HH:mm */
    format(format) {
        return $date.format(this.date, format);
    }
    setMilliseconds(v) {
        this.date.setMilliseconds(v);
        return this;
    }
    setSeconds(v) {
        this.date.setSeconds(v);
        return this;
    }
    setMinutes(v) {
        this.date.setMinutes(v);
        return this;
    }
    setHours(h, min, sec, ms) {
        this.date.setHours(h);
        if (min != null)
            this.date.setMinutes(min);
        if (sec != null)
            this.date.setSeconds(sec);
        if (ms != null)
            this.date.setMilliseconds(ms);
        return this;
    }
    /** Sets the numeric day-of-the-month value of the Date object using local time. */
    setDate(v) {
        this.date.setDate(v);
        return this;
    }
    setMonth(v) {
        this.date.setMonth(v);
        return this;
    }
    setFullYear(v) {
        this.date.setFullYear(v);
        return this;
    }
    nextDay(h, min, s, ms) {
        this.date = $date.additive(this.date, '1d');
        if (h != null) {
            this.date.setHours(h);
        }
        if (min != null) {
            this.date.setMinutes(min);
        }
        if (s != null) {
            this.date.setSeconds(s);
        }
        if (ms != null) {
            this.date.setMilliseconds(ms);
        }
        return this;
    }
    toUnixTimestamp() {
        return $date.toUnixTimestamp(this.date);
    }
}
exports.DateTool = DateTool;
var $date;
(function ($date) {
    function tool(date = new Date()) {
        return DateTool.with(date);
    }
    $date.tool = tool;
    /** e.g. yyyy-MM-dd HH:mm */
    function format(date, format) {
        if (typeof date === 'string' || typeof date === 'number') {
            date = parse(date);
        }
        return Formatter.format(date, format);
    }
    $date.format = format;
    function formatTimespan(ms) {
        let str = '';
        let SECOND = 1000;
        let MINUTE = 60 * SECOND;
        let HOUR = 60 * MINUTE;
        let DAY = 24 * HOUR;
        if (DAY < ms) {
            let days = Math.floor(ms / DAY);
            str += `${days}d`;
            ms -= days * DAY;
        }
        if (HOUR < ms) {
            let hours = Math.floor(ms / HOUR);
            str += ` ${hours}h`;
            ms -= hours * HOUR;
        }
        if (MINUTE < ms) {
            let minutes = Math.floor(ms / MINUTE);
            str += ` ${minutes}min`;
            ms -= minutes * MINUTE;
        }
        if (SECOND < ms) {
            let seconds = Math.floor(ms / SECOND);
            str += ` ${seconds}s`;
            ms -= seconds * SECOND;
        }
        if (0 < ms) {
            str += ` ${ms}ms`;
        }
        return str.trim();
    }
    $date.formatTimespan = formatTimespan;
    function dayStart(date = new Date()) {
        let result = new Date(date);
        result.setHours(0, 0, 0, 0);
        return result;
    }
    $date.dayStart = dayStart;
    function hourStart(date = new Date()) {
        let result = new Date(date);
        result.setMinutes(0, 0, 0);
        return result;
    }
    $date.hourStart = hourStart;
    function dayEnd(date = new Date()) {
        let result = new Date(date);
        result.setHours(23, 59, 59, 999);
        return result;
    }
    $date.dayEnd = dayEnd;
    function weekStart(date = new Date()) {
        let result = new Date(date);
        let day = result.getDay() - 1;
        if (day === -1) {
            day = 6;
        }
        result.setDate(result.getDate() - day);
        result.setHours(0, 0, 0, 0);
        return result;
    }
    $date.weekStart = weekStart;
    function weekEnd(date = new Date()) {
        let result = new Date(date);
        let day = result.getDay() - 1;
        if (day === -1) {
            day = 6;
        }
        result.setDate(result.getDate() + (6 - day));
        result.setHours(23, 59, 59, 999);
        return result;
    }
    $date.weekEnd = weekEnd;
    function monthStart(date = new Date()) {
        let result = new Date(date);
        result.setDate(1);
        result.setHours(0, 0, 0, 0);
        return result;
    }
    $date.monthStart = monthStart;
    function monthEnd(date = new Date()) {
        let result = new Date(date);
        result.setMonth(result.getMonth() + 1);
        result.setDate(1);
        result.setHours(0, 0, 0, -1);
        return result;
    }
    $date.monthEnd = monthEnd;
    /** date1 + X === date2 */
    function daysBetween(a, b, abs = true) {
        let aStart = dayStart(a);
        let bStart = dayStart(b);
        let diff = bStart.valueOf() - aStart.valueOf();
        if (abs)
            diff = Math.abs(diff);
        return Math.floor(diff / (24 * 60 * 60 * 1000));
    }
    $date.daysBetween = daysBetween;
    /** hour1 + X === hour2 */
    function hoursBetween(a, b, abs = true) {
        let aStart = hourStart(a);
        let bStart = hourStart(b);
        let diff = bStart.valueOf() - aStart.valueOf();
        if (abs)
            diff = Math.abs(diff);
        return Math.floor(diff / (60 * 60 * 1000));
    }
    $date.hoursBetween = hoursBetween;
    function minsBetween(a, b, abs = true) {
        if (typeof a === 'string') {
            a = parse(a);
        }
        if (typeof b === 'string') {
            b = parse(b);
        }
        let ms = b.valueOf() - a.valueOf();
        if (abs)
            ms = Math.abs(ms);
        return Math.floor(ms / (60 * 1000));
    }
    $date.minsBetween = minsBetween;
    /**
     * - DD-MM-YYYYY (HH:mm)?
     * - DD.MM.YYYYY (HH:mm)?
     * - ISODate
     * - Ticks
     */
    function parse(mix, default_) {
        if (mix instanceof Date) {
            return mix;
        }
        if (typeof mix === 'number') {
            return new Date(mix);
        }
        if (mix == null || mix === '') {
            return null;
        }
        if (mix.includes('T') || mix.includes('Z')) {
            return new Date(mix);
        }
        let format = mix;
        let H = 0;
        let Min = 0;
        let hours = /(\d{2}):(\d{2})/.exec(format);
        if (hours) {
            H = Number(hours[1]);
            Min = Number(hours[2]);
        }
        let Y = 0;
        let M = 1;
        let D = 1;
        let dateMatch = /(\d{2})[\.\-](\d{2})[\.\-](\d{4})/.exec(format);
        if (dateMatch) {
            D = Number(dateMatch[1]);
            M = Number(dateMatch[2]);
            Y = Number(dateMatch[3]);
        }
        else {
            dateMatch = /(\d{4})[\.\-](\d{2})[\.\-](\d{2})/.exec(format);
            if (dateMatch) {
                Y = Number(dateMatch[1]);
                M = Number(dateMatch[2]);
                D = Number(dateMatch[3]);
            }
        }
        if (Y === 0) {
            if (arguments.length > 1) {
                return default_;
            }
            throw new Error(`Invalid format ${format}`);
        }
        return new Date(Y, M - 1, D, H, Min);
    }
    $date.parse = parse;
    /**
     * s|sec|seconds|m|mins?|h|hours?|d|days?|w|weeks?|months?|y|years?
     * e.g: 2h
     * @param str
     * @param opts Default: ms
     */
    function parseTimespan(str, opts) {
        let direction = str[0] === '-' ? -1 : +1;
        if (direction === -1) {
            str = str.substring(1);
        }
        let rgx = /^([\d\.]+)(s|sec|seconds|m|mins?|h|hours?|d|days?|w|weeks?|months?|y|years?)$/;
        let match = rgx.exec(str);
        if (match == null) {
            throw new Error(`Invalid Humanize seconds. Pattern: ${rgx.toString()}. Got: ${str}`);
        }
        let val = parseFloat(match[1]);
        let unit = match[2];
        let MS = 1000;
        if (opts?.get === 's') {
            MS = 1;
        }
        MS *= direction;
        switch (unit) {
            case 's':
            case 'sec':
                return val * MS;
            case 'm':
            case 'min':
            case 'mins':
                return val * 60 * MS;
            case 'h':
            case 'hour':
            case 'hours':
                return val * 60 * 60 * MS;
            case 'd':
            case 'day':
            case 'days':
                return val * 60 * 60 * 24 * MS;
            case 'w':
            case 'week':
            case 'weeks':
                return val * 60 * 60 * 24 * 7 * MS;
            case 'month':
            case 'months':
                if (opts?.anchor) {
                    let date = new Date(opts.anchor);
                    date.setMonth(date.getMonth() + val * direction);
                    let result = date.valueOf() - opts.anchor.valueOf();
                    if (opts?.get === 's') {
                        result = Math.round(result / 1000);
                    }
                    return result;
                }
                return val * 60 * 60 * 24 * 31 * MS;
            case 'y':
            case 'year':
            case 'years':
                if (opts?.anchor) {
                    let date = new Date(opts.anchor);
                    date.setFullYear(date.getFullYear() + val * direction);
                    let result = date.valueOf() - opts.anchor.valueOf();
                    if (opts?.get === 's') {
                        result = Math.round(result / 1000);
                    }
                    return result;
                }
                return val * 60 * 60 * 24 * 365 * MS;
        }
        throw new Error(`Invalid units ${str}`);
    }
    $date.parseTimespan = parseTimespan;
    function additive(date, x) {
        let d = parse(date);
        let timestamp = d.getTime();
        if (typeof x === 'number') {
            return new Date(timestamp + x);
        }
        let ms = parseTimespan(x, { anchor: d });
        let target = new Date(timestamp + ms);
        let offset = d.getTimezoneOffset();
        var diff = offset - target.getTimezoneOffset();
        if (diff !== 0) {
            const h = diff / 60 | 0;
            target.setHours(target.getHours() - h);
        }
        return target;
    }
    $date.additive = additive;
    function equal(a, b, precision = 'ms') {
        let aYear = a.getFullYear();
        let bYear = b.getFullYear();
        if (aYear !== bYear) {
            return false;
        }
        if (precision === 'year') {
            return true;
        }
        let aMonth = a.getMonth();
        let bMonth = b.getMonth();
        if (aMonth !== bMonth) {
            return false;
        }
        if (precision === 'month') {
            return true;
        }
        let aDate = a.getDate();
        let bDate = b.getDate();
        if (aDate !== bDate) {
            return false;
        }
        if (precision === 'date') {
            return true;
        }
        let aHours = a.getHours();
        let bHours = b.getHours();
        if (aHours !== bHours) {
            return false;
        }
        if (precision === 'hour') {
            return true;
        }
        let aMins = a.getMinutes();
        let bMins = b.getMinutes();
        if (aMins !== bMins) {
            return false;
        }
        if (precision === 'minute') {
            return true;
        }
        let aSec = a.getSeconds();
        let bSec = b.getSeconds();
        if (aSec !== bSec) {
            return false;
        }
        if (precision === 'second') {
            return true;
        }
        let aMs = a.getMilliseconds();
        let bMs = b.getMilliseconds();
        if (aMs !== bMs) {
            return false;
        }
        return true;
    }
    $date.equal = equal;
    function isSameDay(a, b) {
        if (a.getFullYear() !== b.getFullYear()) {
            return false;
        }
        if (a.getMonth() !== b.getMonth()) {
            return false;
        }
        if (a.getDate() !== b.getDate()) {
            return false;
        }
        return true;
    }
    $date.isSameDay = isSameDay;
    function toUnixTimestamp(date) {
        return Math.floor(date.getTime() / 1000);
    }
    $date.toUnixTimestamp = toUnixTimestamp;
    let Formatter;
    (function (Formatter) {
        const _cultureInfo = {
            MONTH: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            MONTH_SHORT: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'July',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec',
            ],
            DAY: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            DAY_SHORT: [
                'Mon',
                'Tues',
                'Weds',
                'Thurs',
                'Fri',
                'Sat',
                'Sun',
            ],
        };
        let _date;
        function format(date, format) {
            _date = date;
            return format
                .replace('Mm', Mm)
                .replace('MMM', MMM)
                .replace('MM', MM)
                .replace('#M', $M)
                .replace('yyyy', yyyy)
                .replace('yy', yy)
                .replace('dd', dd)
                .replace('#d', $d)
                .replace('Dd', Dd)
                .replace('DDD', DDD)
                .replace('HH', HH)
                .replace('hh', hh)
                .replace('#h', $h)
                .replace('mm', mm)
                .replace('#m', $m)
                .replace('ss', ss)
                .replace('#s', $s);
        }
        Formatter.format = format;
        ;
        const yyyy = function () {
            return String(_date.getFullYear());
        };
        const yy = function () {
            return String(_date.getFullYear() % 100);
        };
        const $M = function () {
            return String(_date.getMonth() + 1);
        };
        const MM = function () {
            return pad(_date.getMonth() + 1);
        };
        const Mm = function () {
            return _cultureInfo.MONTH_SHORT[_date.getMonth()];
        };
        const MMM = function () {
            return _cultureInfo.MONTH[_date.getMonth()];
        };
        const $d = function () {
            return String(_date.getDate());
        };
        const dd = function () {
            return pad(_date.getDate());
        };
        const Dd = function () {
            return _cultureInfo.DAY_SHORT[_date.getMonth()];
        };
        const DDD = function () {
            return _cultureInfo.DAY_SHORT[_date.getMonth()];
        };
        const $H = function () {
            return String(_date.getHours());
        };
        const HH = function () {
            return pad(_date.getHours());
        };
        const hh = HH;
        const $h = $H;
        const $m = function () {
            return String(_date.getMinutes());
        };
        const mm = function () {
            return pad(_date.getMinutes());
        };
        const $s = function () {
            return String(_date.getSeconds());
        };
        const ss = function () {
            return pad(_date.getSeconds());
        };
        function pad(value) {
            return value > 9 ? value : '0' + value;
        }
    })(Formatter || (Formatter = {}));
})($date = exports.$date || (exports.$date = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__date === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__date) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__date, module.exports);
    } else {
        _dequanto_src_utils__date = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__path;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__path != null ? _dequanto_src_utils__path : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$path = void 0;
const atma_utils_1 = require("atma-utils");
const _config_1 = _dequanto_src_utils__config;
var $path;
(function ($path) {
    let root = null;
    function resolve(path) {
        return atma_utils_1.class_Uri.combine(root ?? (root = getRoot()), path);
    }
    $path.resolve = resolve;
    function isAbsolute(path) {
        if (path[0] === '/') {
            return true;
        }
        let hasProtocol = /^[\w]{2,5}:[\\\/]{2,}/.test(path);
        if (hasProtocol) {
            return true;
        }
        return false;
    }
    $path.isAbsolute = isAbsolute;
    function getRoot() {
        let base = _config_1.$config.get('settings.base');
        if (base != null) {
            let cwd = process.cwd();
            return atma_utils_1.class_Uri.combine('file://' + cwd, base);
        }
        let uri = new atma_utils_1.class_Uri('file://' + __dirname + '/');
        while (true) {
            let dir = getDirName(uri.path);
            if (!dir || dir === '/') {
                throw new Error(`Root path not resolved: ${__dirname}`);
            }
            if (dir === 'lib' || dir === 'src') {
                uri = uri.cdUp();
                let path = uri.toString();
                if (/dequanto/.test(path) === false) {
                    path = uri.combine('dequanto').toString();
                }
                return path;
            }
            uri = uri.cdUp();
        }
    }
    function getDirName(path) {
        return /\/?([^\/]+)\/?$/.exec(path)?.[1];
    }
})($path = exports.$path || (exports.$path = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__path === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__path) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__path, module.exports);
    } else {
        _dequanto_src_utils__path = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__abiParser;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__abiParser != null ? _dequanto_src_utils__abiParser : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$abiParser = void 0;
var $abiParser;
(function ($abiParser) {
    function getReturnType(abi) {
        let outputs = abi.outputs;
        if (outputs == null || outputs.length == 0) {
            return 'uint256';
        }
        if (outputs.length === 1 && !outputs[0].name) {
            return outputs[0].type;
        }
        let hasKeys = outputs.every(x => Boolean(x.name));
        if (hasKeys) {
            return 'object';
        }
        return 'array';
    }
    $abiParser.getReturnType = getReturnType;
    function getReturnTypeFromTypes(outputs) {
        if (outputs == null || outputs.length == 0) {
            return 'uint256';
        }
        if (outputs.length === 1 && !outputs[0].name) {
            return outputs[0].type;
        }
        let hasKeys = outputs.every(x => Boolean(x.name));
        if (hasKeys) {
            return 'object';
        }
        return 'array';
    }
    $abiParser.getReturnTypeFromTypes = getReturnTypeFromTypes;
    const methodRgx = /^((?<type>function|event)\s+)?(?<methodName>\w+)\s*\((?<params>[^)]+)?\)\s*((:|returns)(?<return>.+))?$/;
    /**
     *  foo(uint256):address
     *  function foo(uint256): (address account, uint256 value)
     *  function foo(uint256) returns (address)
     */
    function parseMethod(methodAbi) {
        let outputs;
        let match = methodRgx.exec(methodAbi);
        if (match == null) {
            throw new Error(`Invalid method abi ${methodAbi}. Expect like 'foo(uint256):address'`);
        }
        let fnName = match.groups.methodName;
        let $return = match.groups.return?.trim() ?? 'uint256';
        outputs = parseArguments($return);
        let inputs = Parse.parametersLine(match.groups.params ?? '');
        return {
            constant: false,
            payable: false,
            //"stateMutability": "view",
            name: fnName,
            inputs: inputs,
            outputs: outputs,
            type: match.groups.type ?? 'function',
        };
    }
    $abiParser.parseMethod = parseMethod;
    // uint256
    // address[]
    // (uint256, uint256)
    // (uint256 foo, uint256 bar)
    // (uint256 foo, uint256 bar)[]
    function parseArguments(line) {
        line = line?.trim();
        if (!line || line === '()') {
            return [];
        }
        let c = line[0];
        if (c === '{') {
            throw new Error(`${line} is not supported, use (...) or [...] declarations`);
        }
        if (c === '[' || c === '(') {
            let end = Parse.goToClosing(line, 0, c);
            let parametersLine = line.substring(1, end);
            let isArray = line.endsWith('[]');
            let params = Parse.parametersLine(parametersLine);
            let isTuple = params.every(x => Boolean(x.name));
            if (isTuple && isArray) {
                return [
                    {
                        name: '',
                        type: `tuple[]`,
                        components: params
                    }
                ];
            }
            if (params.length === 1) {
                line = params[0].type;
                params = [
                    {
                        name: "",
                        type: line,
                    },
                ];
            }
            return params;
        }
        // if (c === '{') {
        //     let params = line.substring(1, line.length - 1);
        //     outputs = params.split(',').map(x => x.trim()).map(param => {
        //         let [_type, _name] = param.split(/[\s+:]/).map(x => x.trim()).filter(Boolean);
        //         return {
        //             name: _name ?? '',
        //             type: _type.trim()
        //         };
        //     });
        // }
        return [
            {
                name: '',
                type: line,
            },
        ];
    }
    $abiParser.parseArguments = parseArguments;
})($abiParser = exports.$abiParser || (exports.$abiParser = {}));
var Parse;
(function (Parse) {
    // uint256 foo, uint bar, address qux
    function parametersLine(paramsStr) {
        return paramsStr
            .split(',')
            .map(x => x.trim())
            .filter(Boolean)
            .map(param => {
            let [_type, _name] = param.split(/\s+/).map(x => x.trim()).filter(Boolean);
            return {
                name: _name ?? '',
                type: _type.trim()
            };
        });
    }
    Parse.parametersLine = parametersLine;
    function goToClosing(str, startI, openChar, closeChar) {
        closeChar = closeChar ?? CLOSE_CHARS[openChar];
        let count = 0;
        for (let i = startI; i < str.length; i++) {
            if (str[i] === openChar) {
                count++;
            }
            if (str[i] === closeChar) {
                count--;
            }
            if (count === 0) {
                return i;
            }
        }
        throw new Error(`Unmatched closing chars ${openChar} ${closeChar} in ${str}`);
    }
    Parse.goToClosing = goToClosing;
    const CLOSE_CHARS = {
        '[': ']',
        '(': ')'
    };
})(Parse || (Parse = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__abiParser === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__abiParser) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__abiParser, module.exports);
    } else {
        _dequanto_src_utils__abiParser = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_utils_InputDataUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_utils_InputDataUtils != null ? _dequanto_src_contracts_utils_InputDataUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDataUtils = void 0;
const ethers_1 = require("ethers");
const _abiParser_1 = _dequanto_src_utils__abiParser;
var InputDataUtils;
(function (InputDataUtils) {
    function split(inputData) {
        let str = inputData.substring(2);
        if (str === '') {
            return { method: '', args: [] };
        }
        let methodName = str.substring(0, 8);
        let params = str.substring(8);
        let args = [];
        while (params.length > 0) {
            args.push(params.substring(0, 64));
            params = params.substring(64);
        }
        return {
            method: methodName,
            args
        };
    }
    InputDataUtils.split = split;
    function decode(inputs, bytes) {
        let types = inputs.map(x => x.type);
        let args = ethers_1.utils.defaultAbiCoder.decode(types, bytes);
        let arr = Array.from(args);
        return normalizeArgs(arr);
    }
    InputDataUtils.decode = decode;
    function decodeParamsWithABI(abi, bytes) {
        if (typeof abi === 'string') {
            abi = _abiParser_1.$abiParser.parseMethod(abi);
        }
        let inputs = abi.inputs;
        let types = inputs.map(x => x.type);
        let args = ethers_1.utils.defaultAbiCoder.decode(types, bytes);
        let arr = Array.from(args);
        return normalizeArgs(arr);
    }
    InputDataUtils.decodeParamsWithABI = decodeParamsWithABI;
    function decodeWithABI(IFunctionABI, ...params) {
        let iface = new ethers_1.utils.Interface([IFunctionABI]);
        let methodName;
        if (typeof IFunctionABI === 'string') {
            methodName = /function \s*(?<methodName>[\w\d_]+)/.exec(IFunctionABI)?.groups?.methodName;
        }
        else {
            methodName = IFunctionABI.name;
        }
        if (methodName == null) {
            throw new Error(`Invalid method in ${IFunctionABI}. Expects "function foo(...)"`);
        }
        return iface.encodeFunctionData(methodName, params);
    }
    InputDataUtils.decodeWithABI = decodeWithABI;
    /**
     * function work(uint256 id, address worker, uint256 principalAmount, uint256 loan, uint256 maxReturn, bytes calldata data)
     */
    function encodeWithABI(IFunctionABI, ...params) {
        let iface = new ethers_1.utils.Interface([IFunctionABI]);
        let methodName;
        if (typeof IFunctionABI === 'string') {
            methodName = /function \s*(?<methodName>[\w\d_]+)/.exec(IFunctionABI)?.groups?.methodName;
        }
        else {
            methodName = IFunctionABI.name;
        }
        if (methodName == null) {
            throw new Error(`Invalid method in ${IFunctionABI}. Expects "function foo(...)"`);
        }
        return iface.encodeFunctionData(methodName, params);
    }
    InputDataUtils.encodeWithABI = encodeWithABI;
    function encodeWithTypes(client, types, paramaters) {
        return client.encodeParameters(types, paramaters);
    }
    InputDataUtils.encodeWithTypes = encodeWithTypes;
    function normalizeArgs(args) {
        return args.map(val => {
            if (val?._isBigNumber) {
                return BigInt(val.toString());
            }
            return val;
        });
    }
    InputDataUtils.normalizeArgs = normalizeArgs;
})(InputDataUtils = exports.InputDataUtils || (exports.InputDataUtils = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_utils_InputDataUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_utils_InputDataUtils) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_utils_InputDataUtils, module.exports);
    } else {
        _dequanto_src_contracts_utils_InputDataUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__contract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__contract != null ? _dequanto_src_utils__contract : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$contract = void 0;
const web3_1 = __importDefault(require("web3"));
const _abiUtils_1 = _dequanto_src_utils__abiUtils;
const InputDataUtils_1 = _dequanto_src_contracts_utils_InputDataUtils;
var $contract;
(function ($contract) {
    function keccak256(str) {
        return web3_1.default.utils.keccak256(str);
    }
    $contract.keccak256 = keccak256;
    function normalizeArgs(args) {
        return args.map(val => {
            if (val?._isBigNumber) {
                return BigInt(val.toString());
            }
            if (Array.isArray(val)) {
                return normalizeArgs(val);
            }
            return val;
        });
    }
    $contract.normalizeArgs = normalizeArgs;
    function extractLogsForAbi(tx, abiItem) {
        let topicHash = _abiUtils_1.$abiUtils.getMethodHash(abiItem);
        let logs = tx
            .logs
            .filter(log => {
            return log.topics[0] === topicHash;
        })
            .map(log => {
            return parseLogWithAbi(log, abiItem);
        });
        return logs;
    }
    $contract.extractLogsForAbi = extractLogsForAbi;
    // export function formatLogForAbi (log: ITxLogItem) {
    //     let params = log.arguments.reduce((aggr, arg) => {
    //         aggr[arg.name] = arg.value;
    //         return aggr;
    //     }, {});
    //     return {
    //         contract: log.contract,
    //         arguments: log.arguments,
    //         ...params
    //     };
    // }
    function parseLogWithAbi(log, abiItem) {
        let inputs = abiItem.inputs.slice();
        let args = log.topics.slice(1).map((bytes, i) => {
            let type = inputs.shift();
            let val = InputDataUtils_1.InputDataUtils.decode([type], bytes);
            return {
                name: type.name,
                value: val[0]
            };
        });
        if (inputs.length > 0) {
            let values = InputDataUtils_1.InputDataUtils.decode(inputs, log.data);
            args.push(...values.map((val, i) => {
                return {
                    name: inputs[i].name,
                    value: val
                };
            }));
        }
        let params = args.reduce((aggr, arg) => {
            aggr[arg.name] = arg.value;
            return aggr;
        }, {});
        return {
            blockNumber: log.blockNumber,
            transactionHash: log.transactionHash,
            address: log.address,
            event: abiItem.name,
            arguments: args,
            params: params,
        };
    }
    $contract.parseLogWithAbi = parseLogWithAbi;
})($contract = exports.$contract || (exports.$contract = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__contract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__contract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__contract, module.exports);
    } else {
        _dequanto_src_utils__contract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__abiUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__abiUtils != null ? _dequanto_src_utils__abiUtils : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$abiUtils = void 0;
const web3_1 = __importDefault(require("web3"));
const ethers_1 = require("ethers");
const _contract_1 = _dequanto_src_utils__contract;
var $abiUtils;
(function ($abiUtils) {
    function encodePacked(...args) {
        return web3_1.default.utils.encodePacked(...args);
    }
    $abiUtils.encodePacked = encodePacked;
    function encode(types, values) {
        let coder = new ethers_1.utils.AbiCoder();
        return coder.encode(types, values);
    }
    $abiUtils.encode = encode;
    /** Returns complete method/event hash */
    function getMethodHash(abi) {
        let types = abi.inputs?.map(serializeMethodSignatureArgumentType) ?? [];
        let signature = `${abi.name}(${types.join(',')})`;
        let hash = _contract_1.$contract.keccak256(signature);
        return hash;
    }
    $abiUtils.getMethodHash = getMethodHash;
    function getMethodSignature(abi) {
        let types = abi.inputs?.map(serializeMethodSignatureArgumentType) ?? [];
        let signature = `${abi.name}(${types.join(',')})`;
        let hash = _contract_1.$contract.keccak256(signature);
        return hash.substring(0, 10);
    }
    $abiUtils.getMethodSignature = getMethodSignature;
    function getTopicSignature(abi) {
        let types = abi.inputs?.map(serializeMethodSignatureArgumentType) ?? [];
        let signature = `${abi.name}(${types.join(',')})`;
        let hash = _contract_1.$contract.keccak256(signature);
        return hash;
    }
    $abiUtils.getTopicSignature = getTopicSignature;
    function checkInterfaceOf(abi, iface) {
        if (iface == null || iface.length === 0) {
            return { ok: false };
        }
        for (let item of iface) {
            if (item.type === 'constructor') {
                continue;
            }
            let inAbi = abi.some(x => abiEquals(x, item));
            if (inAbi === false) {
                return { ok: false, missing: item.name };
            }
        }
        return { ok: true };
    }
    $abiUtils.checkInterfaceOf = checkInterfaceOf;
    function abiEquals(a, b) {
        if (a.name !== b.name) {
            return false;
        }
        let aInputs = a.inputs ?? [];
        let bInputs = b.inputs ?? [];
        if (aInputs.length !== bInputs.length) {
            return false;
        }
        //@TODO: may be better AbiInput comparison?
        for (let i = 0; i < aInputs.length; i++) {
            let aInput = aInputs[i];
            let bInput = bInputs[i];
            if (aInput?.type !== bInput?.type) {
                return false;
            }
        }
        return true;
    }
    function serializeMethodSignatureArgumentType(input) {
        if (input.type === 'tuple') {
            let types = input.components.map(x => serializeMethodSignatureArgumentType(x));
            return `(${types.join(',')})`;
        }
        return input.type;
    }
})($abiUtils = exports.$abiUtils || (exports.$abiUtils = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__abiUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__abiUtils) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__abiUtils, module.exports);
    } else {
        _dequanto_src_utils__abiUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_gen_GeneratorFromAbi;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_gen_GeneratorFromAbi != null ? _dequanto_src_gen_GeneratorFromAbi : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorFromAbi = void 0;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const alot_1 = __importDefault(require("alot"));
const _abiType_1 = _dequanto_src_utils__abiType;
const _date_1 = _dequanto_src_utils__date;
const _path_1 = _dequanto_src_utils__path;
const _abiUtils_1 = _dequanto_src_utils__abiUtils;
class GeneratorFromAbi {
    static get Gen() {
        return Gen;
    }
    async generate(abiJson, opts) {
        let methodsArr = (0, alot_1.default)(abiJson)
            .filter(x => x.type === 'function')
            .groupBy(x => x.name)
            .map(group => {
            if (group.values.length === 1) {
                let item = group.values[0];
                return Gen.serializeMethodTs(item);
            }
            if (group.values.length > 1) {
                let items = group.values;
                return Gen.serializeMethodTsOverloads(items);
            }
            return null;
        })
            .filter(Boolean)
            .map(Str.formatMethod)
            .toArray();
        let eventsArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEvent(x))
            .filter(Boolean)
            .map(Str.formatMethod);
        ;
        let eventsExtractorsArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventExtractor(x))
            .filter(Boolean)
            .map(Str.formatMethod);
        let eventsFetchersArr = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventFetcher(x))
            .filter(Boolean)
            .map(Str.formatMethod);
        let eventInterfaces = abiJson
            .filter(x => x.type === 'event')
            .map(x => Gen.serializeEventInterface(x))
            .filter(Boolean)
            .map(Str.formatMethod);
        ;
        let methods = methodsArr.join('\n\n');
        let events = eventsArr.join('\n\n');
        let eventsExtractors = eventsExtractorsArr.join('\n\n');
        let eventsFetchers = eventsFetchersArr.join('\n\n');
        let name = opts.name;
        let templatePath = _path_1.$path.resolve(`/src/gen/ContractTemplate.ts`);
        let template = await atma_io_1.File.readAsync(templatePath, { skipHooks: true });
        let EtherscanStr;
        let EthWeb3ClientStr;
        let imports = [];
        let explorerUrl;
        switch (opts.network) {
            case 'bsc':
                EtherscanStr = 'Bscscan';
                EthWeb3ClientStr = 'BscWeb3Client';
                imports = [
                    `import { Bscscan } from '@dequanto/BlockchainExplorer/Bscscan'`,
                    `import { BscWeb3Client } from '@dequanto/clients/BscWeb3Client'`,
                ];
                explorerUrl = `https://bscscan.com/address/${opts.implementation}#code`;
                break;
            case 'polygon':
                EtherscanStr = 'Polyscan';
                EthWeb3ClientStr = 'PolyWeb3Client';
                imports = [
                    `import { Polyscan } from '@dequanto/BlockchainExplorer/Polyscan'`,
                    `import { PolyWeb3Client } from '@dequanto/clients/PolyWeb3Client'`,
                ];
                explorerUrl = `https://polygonscan.com/address/${opts.implementation}#code`;
                break;
            case 'xdai':
                EtherscanStr = 'XDaiscan';
                EthWeb3ClientStr = 'XDaiWeb3Client';
                imports = [
                    `import { XDaiscan } from '@dequanto/chains/xdai/XDaiscan'`,
                    `import { XDaiWeb3Client } from '@dequanto/chains/xdai/XDaiWeb3Client'`,
                ];
                explorerUrl = `https://blockscout.com/xdai/mainnet/address/${opts.implementation}/contracts`;
                break;
            case 'eth':
                EtherscanStr = 'Etherscan';
                EthWeb3ClientStr = 'EthWeb3Client';
                imports = [
                    `import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'`,
                    `import { EthWeb3Client } from '@dequanto/clients/EthWeb3Client'`,
                ];
                explorerUrl = `https://etherscan.io/address/${opts.implementation}#code`;
                break;
            case 'hardhat':
                EtherscanStr = 'Etherscan';
                EthWeb3ClientStr = 'HardhatWeb3Client';
                imports = [
                    `import { Etherscan } from '@dequanto/BlockchainExplorer/Etherscan'`,
                    `import { HardhatWeb3Client } from '@dequanto/clients/HardhatWeb3Client'`,
                ];
                explorerUrl = ``;
                break;
            default:
                throw new Error(`Unknown network ${opts.network}`);
        }
        let code = template
            .replace(/\$Etherscan\$/g, EtherscanStr)
            .replace(/\$EthWeb3Client\$/g, EthWeb3ClientStr)
            .replace(`/* IMPORTS */`, imports.join('\n'))
            .replace(`$NAME$`, Gen.toClassName(name))
            .replace(`$ADDRESS$`, opts.address ?? '')
            .replace(`/* METHODS */`, methods)
            .replace(`/* EVENTS */`, events)
            .replace(`/* EVENTS_EXTRACTORS */`, eventsExtractors)
            .replace(`/* EVENTS_FETCHERS */`, eventsFetchers)
            .replace(`$ABI$`, JSON.stringify(abiJson))
            .replace(`$DATE$`, _date_1.$date.format(new Date(), 'yyyy-MM-dd HH:mm'))
            .replace(`$EXPLORER_URL$`, explorerUrl)
            .replace(`/* $EVENT_INTERFACES$ */`, eventInterfaces.join('\n'));
        let directory = name;
        let filename = /[^\\/]+$/.exec(name)[0];
        let path = /\.ts$/.test(opts.output)
            ? opts.output
            : atma_utils_1.class_Uri.combine(opts.output, directory, `${filename}.ts`);
        await atma_io_1.File.writeAsync(path, code, { skipHooks: true });
        if (opts.saveAbi) {
            let path = atma_utils_1.class_Uri.combine(opts.output, directory, `${filename}.json`);
            await atma_io_1.File.writeAsync(path, abiJson);
        }
        console.log(`ABI wrapper class created: ${path}`);
        let sources = opts.sources;
        let sourceFiles = [];
        if (sources) {
            sourceFiles = await alot_1.default.fromObject(sources).mapAsync(async (entry) => {
                let sourceFilename = /\/?([^/]+$)/.exec(entry.key)[1];
                let path = atma_utils_1.class_Uri.combine(opts.output, directory, filename, sourceFilename);
                await atma_io_1.File.writeAsync(path, entry.value.content, { skipHooks: true });
                console.log(`Source code saved: ${path}`);
                return path;
            }).toArrayAsync();
        }
        return {
            main: path,
            sources: sourceFiles,
        };
    }
}
exports.GeneratorFromAbi = GeneratorFromAbi;
var Gen;
(function (Gen) {
    function toClassName(name) {
        let str = name.replace(/[^\w_\-\\/]/g, '');
        str = str.replace(/[\-\\/](\w)/g, (full, letter) => {
            return letter.toUpperCase();
        });
        return str[0].toUpperCase() + str.substring(1);
    }
    Gen.toClassName = toClassName;
    function serializeMethodTs(abi) {
        let isRead = isReader(abi);
        if (isRead) {
            return serializeReadMethodTs(abi);
        }
        return serializeWriteMethodTs(abi);
    }
    Gen.serializeMethodTs = serializeMethodTs;
    function serializeMethodTsOverloads(abis) {
        let isRead = abis.every(abi => isReader(abi));
        if (isRead) {
            return serializeReadMethodTsOverloads(abis);
        }
        return serializeWriteMethodTsOverloads(abis);
    }
    Gen.serializeMethodTsOverloads = serializeMethodTsOverloads;
    function serializeEvent(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        return `
            on${abi.name} (fn: (event: EventLog, ${fnInputArguments}) => void): ClientEventsStream<any> {
                return this.$on('${abi.name}', fn);
            }
        `;
    }
    Gen.serializeEvent = serializeEvent;
    function serializeEventExtractor(abi) {
        return `
            extractLogs${abi.name} (tx: TransactionReceipt): ITxLogItem<TLog${abi.name}>[] {
                let abi = this.$getAbiItem('event', '${abi.name}');
                return this.$extractLogs(tx, abi) as any as ITxLogItem<TLog${abi.name}>[];
            }
        `;
    }
    Gen.serializeEventExtractor = serializeEventExtractor;
    function serializeEventFetcher(abi) {
        let inputs = abi.inputs;
        let indexed = (0, alot_1.default)(inputs).takeWhile(x => x.indexed).toArray();
        let indexedParams = indexed.map(param => `${param.name}?: ${_abiType_1.$abiType.getTsType(param.type, param)}`);
        return `
            async getPastLogs${abi.name} (options?: {
                fromBlock?: number | Date
                toBlock?: number | Date
                params?: { ${indexedParams} }
            }): Promise<ITxLogItem<TLog${abi.name}>[]> {
                let topic = '${_abiUtils_1.$abiUtils.getTopicSignature(abi)}';
                let abi = this.$getAbiItem('event', '${abi.name}');
                let filters = await this.$getPastLogsFilters(abi, {
                    topic,
                    ...options
                });
                let logs= await this.$getPastLogs(filters);
                return logs.map(log => this.$extractLog(log, abi)) as any;
            }
        `;
    }
    Gen.serializeEventFetcher = serializeEventFetcher;
    function serializeEventInterface(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        return `
            type TLog${abi.name} = {
                ${fnInputArguments}
            }
        `;
    }
    Gen.serializeEventInterface = serializeEventInterface;
    function isReader(abi) {
        return ['view', 'pure', null].includes(abi.stateMutability);
    }
    Gen.isReader = isReader;
    function serializeMethodAbi(abi, includeNames) {
        let params = abi.inputs?.map(x => {
            let param = x.type;
            if (includeNames && x.name) {
                param += ' ' + x.name;
            }
            return param;
        }).join(', ') ?? '';
        let returns = serializeMethodAbiReturns(abi.outputs);
        if (returns && abi.outputs.length > 1) {
            returns = `(${returns})`;
        }
        let returnsStr = returns ? `returns ${returns}` : '';
        return `function ${abi.name}(${params}) ${returnsStr}`.trim();
    }
    Gen.serializeMethodAbi = serializeMethodAbi;
    function serializeReadMethodTs(abi) {
        let { fnInputArguments, callInputArguments, fnResult } = serializeArgumentsTs(abi);
        if (callInputArguments) {
            callInputArguments = `, ${callInputArguments}`;
        }
        return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (${fnInputArguments}): ${fnResult} {
                return this.$read('${serializeMethodAbi(abi)}'${callInputArguments});
            }
        `;
    }
    function serializeReadMethodTsOverloads(abis) {
        let overrides = abis.map(abi => {
            let { fnInputArguments, fnResult } = serializeArgumentsTs(abi);
            return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (${fnInputArguments}): ${fnResult}
            `;
        }).join('\n');
        let abi = abis[0];
        let { fnResult } = serializeArgumentsTs(abi);
        let sigs = abis.map(abi => serializeMethodAbi(abi)).map(x => `'${x}'`).join(', ');
        return `
            ${overrides}
            async ${abi.name} (...args): ${fnResult} {
                let abi = this.$getAbiItemOverload([ ${sigs} ], args);
                return this.$read(abi, ...args);
            }
        `;
    }
    function serializeWriteMethodTs(abi) {
        let { fnInputArguments, callInputArguments } = serializeArgumentsTs(abi);
        if (callInputArguments) {
            callInputArguments = `, ${callInputArguments}`;
        }
        return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (sender: TSender, ${fnInputArguments}): Promise<TxWriter> {
                return this.$write(this.$getAbiItem('function', '${abi.name}'), sender${callInputArguments});
            }
        `;
    }
    function serializeWriteMethodTsOverloads(abis) {
        let overrides = abis.map(abi => {
            let { fnInputArguments, fnResult } = serializeArgumentsTs(abi);
            return `
            // ${_abiUtils_1.$abiUtils.getMethodSignature(abi)}
            async ${abi.name} (sender: TSender, ${fnInputArguments}): Promise<TxWriter>
            `;
        }).join('\n');
        let abi = abis[0];
        let sigs = abis.map(abi => serializeMethodAbi(abi)).map(x => `'${x}'`).join(', ');
        return `
            ${overrides}
            async ${abi.name} (sender: TSender, ...args): Promise<TxWriter> {
                let abi = this.$getAbiItemOverload([ ${sigs} ], args);
                return this.$write(abi, sender, ...args);
            }
        `;
    }
    function serializeArgumentsTs(abi) {
        let inputs = abi.inputs.map((input, i) => {
            let result = { ...input };
            if (result.name == null || result.name === '') {
                result.name = 'input' + i;
            }
            if (result.name === 'sender') {
                result.name = '_sender';
            }
            return result;
        });
        let fnInputArguments = inputs
            ?.map((input) => {
            let tsType = _abiType_1.$abiType.getTsType(input.type, input);
            if (tsType == null) {
                throw new Error(`Unknown abi type in arguments: ${input.type}`);
            }
            return `${input.name}: ${tsType}`;
        })
            ?.join(', ') ?? '';
        let callInputArguments = inputs
            ?.map(input => {
            return `${input.name}`;
        })
            ?.join(', ') ?? '';
        let fnResult = serializeMethodTsReturns(abi.outputs);
        return { fnInputArguments, callInputArguments, fnResult };
    }
    function isObjectParams(params) {
        return params?.every(x => Boolean(x.name));
    }
    function serializeMethodAbiReturns(params) {
        if (params == null) {
            return '';
        }
        // if (isObjectParams(params)) {
        //     return params.map(x => serializeMethodAbiReturnsSingle(x)).join(',');
        // }
        return params?.map(x => serializeMethodAbiReturnsSingle(x)).join(',');
    }
    function serializeMethodAbiReturnsSingle(param) {
        if (param == null) {
            return null;
        }
        if (param.components) {
            // tuple, tuple[]
            let fields = serializeMethodAbiReturns(param.components);
            return `[${fields}]${param.type === 'tuple[]' ? '[]' : ''}`;
        }
        // if (param.name && param.type) {
        //     return `${param.type} ${param.name}`;
        // }
        return param.type;
    }
    function serializeMethodTsReturns(params) {
        if (params == null || params.length === 0) {
            params = [{ name: '', type: 'uint256' }];
        }
        let tsTypes = params.map(param => {
            let tsType = _abiType_1.$abiType.getTsType(param.type, param);
            if (tsType == null) {
                throw new Error(`(gen) Unknown abi type in return: ${param.type}`);
            }
            return {
                name: param.name,
                type: tsType
            };
        });
        if (params.length > 1 && isObjectParams(params)) {
            let paramsStr = tsTypes.map(x => `${x.name}: ${x.type}`).join(', ');
            return `Promise<{ ${paramsStr} }>`;
        }
        let fnResult = tsTypes?.map(x => x.type).join(', ');
        if (tsTypes.length > 1) {
            fnResult = `[ ${fnResult} ]`;
        }
        return `Promise<${fnResult}>`;
    }
    // const AbiTsTypes = {
    //     'uint8': 'number',
    //     'uint4': 'number',
    //     'uint': 'number',
    //     'bool': 'boolean',
    //     'bytes': 'Buffer',
    //     'bytes4': 'Buffer',
    //     'bytes32': 'Buffer',
    //     'bytes64': 'Buffer',
    //     'bytes128': 'Buffer',
    //     'bytes256': 'Buffer',
    //     'address': 'TAddress',
    //     'string': 'string',
    // };
    // const AbiTsTypesRgx = [
    //     {
    //         rgx: /uint\d+/,
    //         type: 'bigint',
    //     }
    // ];
})(Gen || (Gen = {}));
var Str;
(function (Str) {
    function formatMethod(str) {
        str = trim(str);
        str = indent(str, '    ');
        return str;
    }
    Str.formatMethod = formatMethod;
    function trim(str) {
        let lines = str.split('\n');
        let min = (0, alot_1.default)(lines).min(x => {
            if (x.trim() === '') {
                return Number.MAX_SAFE_INTEGER;
            }
            let match = /^\s+/.exec(x);
            if (match == null) {
                return Number.MAX_SAFE_INTEGER;
            }
            return match[0].length;
        });
        lines = lines.map((line, i) => {
            let x = line.substring(min);
            if ((i === 0) || (lines.length === i + 1)) {
                if (x === '') {
                    return null;
                }
            }
            return x;
        }).filter(Boolean);
        return lines.join('\n');
    }
    Str.trim = trim;
    function indent(str, indent) {
        return str
            .split('\n')
            .map(x => `${indent}${x}`)
            .join('\n');
    }
    Str.indent = indent;
})(Str || (Str = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_gen_GeneratorFromAbi === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_gen_GeneratorFromAbi) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_gen_GeneratorFromAbi, module.exports);
    } else {
        _dequanto_src_gen_GeneratorFromAbi = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__logger;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__logger != null ? _dequanto_src_utils__logger : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l = exports.$logger = void 0;
const _color_1 = _dequanto_src_utils__color;
const _date_1 = _dequanto_src_utils__date;
var $logger;
(function ($logger) {
    function log(...args) {
        if (args.length === 1 && typeof args[0] !== 'string') {
            console.dir(args[0], { depth: null });
            return;
        }
        console.log(_date_1.$date.format(new Date(), 'HH:mm:ss'), ...colored(args));
    }
    $logger.log = log;
    function warn(...args) {
        console.warn(_date_1.$date.format(new Date(), 'HH:mm:ss'), ...colored(args));
    }
    $logger.warn = warn;
    function error(...args) {
        console.error(_date_1.$date.format(new Date(), 'HH:mm:ss'), ...colored(args));
    }
    $logger.error = error;
    function colored(args) {
        for (let i = 0; i < args.length; i++) {
            let x = args[i];
            if (typeof x !== 'string') {
                continue;
            }
            args[i] = (0, _color_1.$color)(args[i]);
        }
        return args;
    }
})($logger = exports.$logger || (exports.$logger = {}));
function l(strings, ...values) {
    let args = [];
    for (let i = 0; i < strings.length; i++) {
        args.push(strings[i]);
        if (i < values.length) {
            args.push(values[i]);
        }
    }
    // join value types if should be colorized: l`Age: bold<${age}>`
    for (let i = 1; i < args.length - 1; i++) {
        let before = args[i - 1];
        let value = args[i];
        let after = args[i + 1];
        if (typeof before !== 'string' || typeof after !== 'string') {
            continue;
        }
        switch (typeof value) {
            case 'number':
            case 'string':
            case 'boolean':
            case 'undefined':
            case 'bigint':
                break;
            default:
                // skip all non-value types.
                continue;
        }
        args[i - 1] = `${before}${value}${after}`;
        args.splice(i, 2);
        i--;
    }
    $logger.log(...args);
}
exports.l = l;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__logger === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__logger) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__logger, module.exports);
    } else {
        _dequanto_src_utils__logger = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__promise;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__promise != null ? _dequanto_src_utils__promise : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$promise = void 0;
var $promise;
(function ($promise) {
    function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    $promise.wait = wait;
    ;
    function fromEvent(eventEmitter, event) {
        return new Promise((resolve, reject) => {
            const cb = (value) => {
                resolve(value);
                eventEmitter.off(event, cb);
            };
            eventEmitter.on(event, cb);
        });
    }
    $promise.fromEvent = fromEvent;
})($promise = exports.$promise || (exports.$promise = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__promise === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__promise) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__promise, module.exports);
    } else {
        _dequanto_src_utils__promise = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__number;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__number != null ? _dequanto_src_utils__number : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$number = void 0;
const _require_1 = _dequanto_src_utils__require;
var $number;
(function ($number) {
    function div(a, b, digits = 5) {
        let r = 10 ** digits;
        return Math.round(a * r / b) / r;
    }
    $number.div = div;
    /**
     * [min, max)
     * @param min: includes
     * @param max: excludes
     */
    function random(min, max) {
        _require_1.$require.True(min < max, `Random Int expects max to be greater then min: ${min}..${max}`);
        return Math.random() * (max - min) + min;
    }
    $number.random = random;
    /**
     * [min, max)
     * @param min: includes
     * @param max: excludes
     */
    function randomInt(min, max) {
        _require_1.$require.True(min < max, `Random Int expects max to be greater then min: ${min}..${max}`);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    $number.randomInt = randomInt;
    /**
     * [min, max)
     * @param min: includes
     * @param max: excludes
     */
    function randomFloat(min, max, decimals = 0) {
        let decimalsFromNumber = 0;
        while (min * 10 ** decimalsFromNumber % 1 > 0 || max * 10 ** decimalsFromNumber % 1 > 0) {
            decimalsFromNumber++;
        }
        let val = 10 ** Math.max(decimals, decimalsFromNumber);
        return randomInt(min * val, max * val) / val;
    }
    $number.randomFloat = randomFloat;
    function parse(mix) {
        if (!mix)
            return 0;
        if (typeof mix === 'number') {
            return mix;
        }
        let factor = null;
        // string
        let c = mix[mix.length - 1];
        if (c === 'k' || c === 'K') {
            factor = 1000;
            mix = mix.substring(0, mix.length - 1);
        }
        if (c === 'm' || c === 'M') {
            factor = 1000000;
            mix = mix.substring(0, mix.length - 1);
        }
        if (c === 'b' || c === 'B') {
            factor = 1000000000;
            mix = mix.substring(0, mix.length - 1);
        }
        let value = parseFloat(mix.replace(/,+/g, '.'));
        if (factor != null) {
            value *= factor;
        }
        return value;
    }
    $number.parse = parse;
    function round(mix, digits = 0, round = 'round') {
        let number = typeof mix === 'string' ? Number(mix) : mix;
        if (isNaN(number)) {
            return number;
        }
        let factor = Math.pow(10, digits);
        let val = number * factor;
        let e = val - (val | 0);
        if (e < 0) {
            e *= -1;
        }
        if (e < .0001) {
            val = val | 0;
        }
        return Math[round](val) / factor;
    }
    $number.round = round;
    function parseOptional(mix, default_ = null) {
        if (mix == null) {
            return default_;
        }
        if (typeof mix === 'number') {
            return mix;
        }
        if (typeof mix === 'string') {
            switch (mix.toLowerCase()) {
                case 'einweg':
                    return 0.25;
                case 'mehrweg':
                    return 0.15;
            }
            let num = parseFloat(mix.replace(/,+/g, '.'));
            if (Number.isFinite(num) === false) {
                return default_;
            }
            return num;
        }
        throw new Error('Unsupported type to convert to number ' + typeof mix);
    }
    $number.parseOptional = parseOptional;
    function toHex(num) {
        return `0x` + Number(num).toString(16);
    }
    $number.toHex = toHex;
})($number = exports.$number || (exports.$number = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__number === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__number) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__number, module.exports);
    } else {
        _dequanto_src_utils__number = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__fn;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__fn != null ? _dequanto_src_utils__fn : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$fn = void 0;
const _promise_1 = _dequanto_src_utils__promise;
var $fn;
(function ($fn) {
    function retriable(fn, ctx) {
        return new Retriable(fn, ctx);
    }
    $fn.retriable = retriable;
    function timeoutPromise(promise, ms) {
        let err = new Error(`Promise timeouted in ${ms}ms`);
        return new Promise((resolve, reject) => {
            let completed = false;
            let timeout = setTimeout(() => {
                if (completed) {
                    return;
                }
                completed = true;
                reject(err);
            }, ms);
            promise.then(result => {
                completed = true;
                clearTimeout(timeout);
                resolve(result);
            }, err => {
                completed = true;
                clearTimeout(timeout);
                reject(err);
            });
        });
    }
    $fn.timeoutPromise = timeoutPromise;
    function waitForObject(check, opts) {
        let start = Date.now();
        let completed = false;
        let intervalMs = opts?.intervalMs ?? 500;
        let timeoutMs = opts?.timeoutMs ?? null;
        let timeoutMessage = opts?.timeoutMessage ?? `Waiting for object timeouted`;
        return new Promise(async (resolve, reject) => {
            async function tick() {
                let [error, result] = (await check()) ?? [null, null];
                if (result != null) {
                    completed = true;
                    resolve(result);
                    return;
                }
                if (error != null) {
                    completed = true;
                    reject(error);
                    return;
                }
                if (timeoutMs != null && (Date.now() - start) > timeoutMs) {
                    completed = true;
                    let message = typeof timeoutMessage === 'function'
                        ? timeoutMessage()
                        : timeoutMessage;
                    reject(new Error(message));
                    return;
                }
            }
            while (true) {
                try {
                    await tick();
                }
                finally { }
                if (completed === true) {
                    break;
                }
                await _promise_1.$promise.wait(intervalMs);
            }
        });
    }
    $fn.waitForObject = waitForObject;
    class Retriable {
        constructor(fn, ctx) {
            this.fn = fn;
            this.ctx = ctx;
            this._retries = 0;
            this._options = {
                timeout: null,
                retries: null,
                onError: null
            };
        }
        options(opts) {
            this._options = opts;
            return this;
        }
        call(...args) {
            return this.tick(...args);
        }
        async tick(...args) {
            try {
                let result = await this.fn.apply(this.ctx, args);
                return result;
            }
            catch (error) {
                let { timeout, retries = 3, onError } = this._options;
                if (timeout != null) {
                    await _promise_1.$promise.wait(timeout);
                }
                if (++this._retries > retries) {
                    throw error;
                }
                if (onError) {
                    error.message += ` Will be re-executed ${this._retries}/${retries}`;
                    let overridenArgs = await onError(error);
                    if (Array.isArray(overridenArgs)) {
                        args = overridenArgs;
                    }
                }
                return this.tick(...args);
            }
        }
    }
})($fn = exports.$fn || (exports.$fn = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__fn === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__fn) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__fn, module.exports);
    } else {
        _dequanto_src_utils__fn = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_model_PromiEventWrap;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_model_PromiEventWrap != null ? _dequanto_src_clients_model_PromiEventWrap : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiEventWrap = void 0;
const atma_utils_1 = require("atma-utils");
class PromiEventWrap extends atma_utils_1.class_Dfr {
    constructor() {
        super(...arguments);
        this._events = new atma_utils_1.class_EventEmitter();
    }
    on(event, cb) {
        if (event !== 'error' && this.$source) {
            this.bindOn(event);
        }
        this._events.on(event, cb);
        return this;
    }
    once(event, cb) {
        if (event !== 'error' && this.$source) {
            this.bindOnOnce(event);
        }
        this._events.once(event, cb);
        return this;
    }
    emit(event, ...args) {
        this._events.emit(event, ...args);
    }
    /** Attach this wrapper to the promievent */
    bind(promiEvent) {
        this.$source = promiEvent;
        for (let event in this._events._listeners) {
            if (event !== 'error') {
                this.bindOn(event);
            }
        }
        promiEvent.then(result => {
            this.resolve(result);
        }, err => {
            this.reject(err);
        });
    }
    bindOn(event) {
        this.$source.on(event, (...args) => {
            this.emit(event, ...args);
        });
    }
    bindOnOnce(event) {
        this.$source.once(event, (...args) => {
            this.emit(event, ...args);
        });
    }
}
exports.PromiEventWrap = PromiEventWrap;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_model_PromiEventWrap === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_model_PromiEventWrap) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_model_PromiEventWrap, module.exports);
    } else {
        _dequanto_src_clients_model_PromiEventWrap = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_model_ClientStatus;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_model_ClientStatus != null ? _dequanto_src_clients_model_ClientStatus : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStatus = void 0;
var ClientStatus;
(function (ClientStatus) {
    ClientStatus[ClientStatus["Ok"] = 200] = "Ok";
    ClientStatus[ClientStatus["NetworkError"] = 500] = "NetworkError";
    ClientStatus[ClientStatus["CallError"] = 400] = "CallError";
})(ClientStatus = exports.ClientStatus || (exports.ClientStatus = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_model_ClientStatus === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_model_ClientStatus) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_model_ClientStatus, module.exports);
    } else {
        _dequanto_src_clients_model_ClientStatus = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_ClientPoolStats;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_ClientPoolStats != null ? _dequanto_src_clients_ClientPoolStats : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPoolStats = exports.ClientPoolTrace = exports.ClientPoolTraceError = void 0;
const _logger_1 = _dequanto_src_utils__logger;
class ClientPoolStatsHandler {
    constructor() {
        this.calls = [];
    }
    addCall(log) {
        this.calls.push(log);
    }
    log() {
        _logger_1.$logger.log(this.calls);
    }
}
class ClientPoolTraceError extends Error {
    static create($error, trace) {
        let traceLog = trace?.toString() ?? '';
        return {
            name: $error.name,
            stack: $error.stack,
            message: traceLog + '\n' + $error.message
        };
    }
}
exports.ClientPoolTraceError = ClientPoolTraceError;
class ClientPoolTrace {
    constructor() {
        this.calls = [];
    }
    onComplete(log) {
        this.calls.push(log);
    }
    toString() {
        return [
            `${this.action} using clients:`,
            ...this.calls.map(call => {
                return [
                    `${call.url} ${call.status} ${call.time}ms`,
                    `${call.error?.message}`
                ].join('\n');
            })
        ].join('\n');
    }
    static createContractCall(address, methodName, ...args) {
        let trace = new ClientPoolTrace();
        trace.action = `Contact: ${address} ${methodName}(${args.join(', ')})`;
        return trace;
    }
}
exports.ClientPoolTrace = ClientPoolTrace;
exports.ClientPoolStats = new ClientPoolStatsHandler();
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_ClientPoolStats === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_ClientPoolStats) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_ClientPoolStats, module.exports);
    } else {
        _dequanto_src_clients_ClientPoolStats = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_ClientEventsStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_ClientEventsStream != null ? _dequanto_src_clients_ClientEventsStream : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEventsStream = void 0;
class ClientEventsStream {
    constructor(contract, eventAbi, stream) {
        this.contract = contract;
        this.eventAbi = eventAbi;
        this.stream = stream;
    }
    onData(cb) {
        this.stream.on('data', (event) => {
            let inputs = this.eventAbi.inputs.map(arg => {
                let val = event.returnValues[arg.name];
                return val;
            });
            cb(event, ...inputs);
        });
        return this;
    }
    onConnected(cb) {
        this.stream.on('connected', data => {
            cb(data);
        });
        return this;
    }
    onError(cb) {
        this.stream.on('error', error => {
            cb(error);
        });
        return this;
    }
}
exports.ClientEventsStream = ClientEventsStream;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_ClientEventsStream === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_ClientEventsStream) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_ClientEventsStream, module.exports);
    } else {
        _dequanto_src_clients_ClientEventsStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_utils_ClientErrorUtil;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_utils_ClientErrorUtil != null ? _dequanto_src_clients_utils_ClientErrorUtil : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientErrorUtil = void 0;
var ClientErrorUtil;
(function (ClientErrorUtil) {
    function isConnectionFailed(error) {
        if (error.code === 1006 || error.reason === 'connection failed') {
            return true;
        }
        let str = error.message;
        if (str.includes('CONNECTION ERROR') || str.includes('Invalid JSON RPC response') || str.includes('getaddrinfo ENOTFOUND')) {
            return true;
        }
        return false;
    }
    ClientErrorUtil.isConnectionFailed = isConnectionFailed;
    function isAlreadyKnown(error) {
        return /already known/i.test(error.message);
    }
    ClientErrorUtil.isAlreadyKnown = isAlreadyKnown;
    function IsInsufficientFunds(error) {
        // @TODO - is there a future proof way to check for the error?
        return /insufficient funds/i.test(error.message);
    }
    ClientErrorUtil.IsInsufficientFunds = IsInsufficientFunds;
    function IsNonceTooLow(error) {
        return /nonce too low/i.test(error.message);
    }
    ClientErrorUtil.IsNonceTooLow = IsNonceTooLow;
})(ClientErrorUtil = exports.ClientErrorUtil || (exports.ClientErrorUtil = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_utils_ClientErrorUtil === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_utils_ClientErrorUtil) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_utils_ClientErrorUtil, module.exports);
    } else {
        _dequanto_src_clients_utils_ClientErrorUtil = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_ClientPool;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_ClientPool != null ? _dequanto_src_clients_ClientPool : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPool = void 0;
const alot_1 = __importDefault(require("alot"));
const memd_1 = __importDefault(require("memd"));
const web3_1 = __importDefault(require("web3"));
const _date_1 = _dequanto_src_utils__date;
const _number_1 = _dequanto_src_utils__number;
const _fn_1 = _dequanto_src_utils__fn;
const PromiEventWrap_1 = _dequanto_src_clients_model_PromiEventWrap;
const ClientStatus_1 = _dequanto_src_clients_model_ClientStatus;
const ClientPoolStats_1 = _dequanto_src_clients_ClientPoolStats;
const atma_utils_1 = require("atma-utils");
const ClientEventsStream_1 = _dequanto_src_clients_ClientEventsStream;
const ClientErrorUtil_1 = _dequanto_src_clients_utils_ClientErrorUtil;
const _logger_1 = _dequanto_src_utils__logger;
class ClientPool {
    constructor(config) {
        this.discoveredPartial = false;
        this.discoveredFull = false;
        if (config.endpoints != null && config.endpoints.length > 0) {
            this.clients = config.endpoints.map(cfg => new WClient(cfg));
        }
        else if (config.web3 || config.provider) {
            this.clients = [new WClient({ web3: config.web3 ?? config.provider })];
        }
        else {
            console.dir(config, { depth: null });
            throw new Error(`Neither Node endpoints nor Web3 instance`);
        }
        if (this.clients.length < 2) {
            this.discoveredPartial = true;
            this.discoveredFull = true;
        }
    }
    callSync(fn) {
        let arr = this.clients.filter(x => x.status === 'ok');
        let wClient = arr[_number_1.$number.randomInt(0, arr.length)];
        let { status, result } = wClient.callSync(fn);
        if (status == ClientStatus_1.ClientStatus.Ok) {
            return result;
        }
        throw result;
    }
    async call(fn, opts) {
        let used = new Map();
        let errors = [];
        while (true) {
            let wClient = await this.next(used, opts);
            if (wClient == null) {
                let error = errors.pop();
                if (error == null) {
                    let urls = this
                        .clients
                        .map(x => `    ${x.config.url}`)
                        .join('\n');
                    error = new Error(`Live clients not found in \n${urls}`);
                }
                throw ClientPoolStats_1.ClientPoolTraceError.create(error, opts?.trace);
            }
            let { status, result, error, time } = await wClient.call(fn);
            opts
                ?.trace
                ?.onComplete({ status, error, time, url: wClient.config.url });
            used.set(wClient, 1);
            errors.push(error ?? result);
            if (status == ClientStatus_1.ClientStatus.Ok) {
                return result;
            }
            if (status === ClientStatus_1.ClientStatus.CallError) {
                let error = ClientPoolStats_1.ClientPoolTraceError.create(errors.pop(), opts?.trace);
                //console.log(`Errored ${error.message}`);
                throw error;
                return result;
            }
        }
    }
    async getWeb3(options) {
        let wClient = await this.next(null, options, { manual: true });
        if (wClient == null) {
            throw new Error(`No client found in ${this.clients.length} Clients with options: ${JSON.stringify(options)}`);
        }
        return wClient?.web3;
    }
    async getNodeURL(options) {
        let wClient = await this.next(null, options, { manual: true });
        if (wClient == null) {
            let stats = await this.getNodeStats();
            let info = stats.map(x => `    ${x.url}. ERR: ${x.fail}; OK: ${x.success}; Ping: ${x.ping}`).join('\n');
            let requirements = JSON.stringify(options);
            throw new Error(`No alive node for ${requirements} found. \n ${info}`);
        }
        return wClient?.config.url;
    }
    async releaseWeb3() {
    }
    getOptionForFetchableRange() {
        const DEFAULT = null;
        let max = (0, alot_1.default)(this.clients).max(x => x.config?.fetchableBlockRange ?? 0);
        if (max === 0) {
            return DEFAULT;
        }
        return max;
    }
    callPromiEvent(fn, opts, used = new Map(), errors = [], root) {
        root = root ?? new PromiEventWrap_1.PromiEventWrap();
        (async () => {
            let wClient = await this.next(used, opts);
            if (wClient == null) {
                if (opts?.silent) {
                    return root;
                }
                setTimeout(() => {
                    let urls = this
                        .clients
                        .map(x => `    ${x.config.url}`)
                        .join('\n');
                    let error = new Error(`Live clients not found in \n${urls}`);
                    root.emit('error', error);
                    root.reject(error);
                });
                return root;
            }
            let promiEvent = wClient.callPromiEvent(fn);
            root.bind(promiEvent);
            promiEvent.on('error', async (error) => {
                error.message += ` (RPC: ${wClient.config.url})`;
                if (ClientErrorUtil_1.ClientErrorUtil.isConnectionFailed(error)) {
                    this.callPromiEvent(fn, opts, used, errors, root);
                    return;
                }
                if (ClientErrorUtil_1.ClientErrorUtil.isAlreadyKnown(error)) {
                    _logger_1.$logger.log(`TxWriter ERROR ${error.message}. Check pending...`);
                    let web3 = await this.getWeb3();
                    let txs = await web3.eth.getPendingTransactions();
                    _logger_1.$logger.log('PENDING ', txs?.map(x => x.hash));
                    // throw anyway
                }
                root.emit('error', error);
                root.reject(error);
            });
            used.set(wClient, 1);
            if (typeof opts?.parallel === 'number') {
                while (--opts.parallel > 0) {
                    this.callPromiEvent(fn, {
                        ...opts,
                        distinct: true,
                        parallel: null,
                        silent: true
                    }, used, errors, root);
                }
            }
        })();
        return root;
    }
    getEventStream(address, abi, event) {
        if (this.ws == null) {
            this.ws = this.clients.find(x => x.config.url?.startsWith('ws'));
        }
        let stream = this.ws.getEventStream(address, abi, event);
        return stream;
    }
    getNodeStats() {
        return this
            .clients
            .filter(client => client.getRequestCount() > 0)
            .map(client => {
            return {
                url: client.config.url,
                ...client.requests
            };
        });
    }
    async getNodeInfos() {
        async function peerCount(wClient) {
            /** @TODO Public nodes smt. do not allow net_peerCount methods. Allow to switch this on/off on node-url-config level */
            try {
                return await wClient.eth.net.getPeerCount();
            }
            catch (error) {
                return `ERROR: ${error.message}`;
            }
        }
        let nodes = await (0, alot_1.default)(this.clients).mapAsync(async (wClient, idx) => {
            let url = wClient.config.url;
            try {
                let start = Date.now();
                let [syncing, blockNumber, peers, node] = await Promise.all([
                    wClient.eth.isSyncing(),
                    wClient.eth.getBlockNumber(),
                    peerCount(wClient),
                    wClient.eth.getNodeInfo(),
                ]);
                let ping = Math.round((Date.now() - start) / 3);
                let syncData = typeof syncing === 'boolean' ? null : syncing;
                return {
                    url: url,
                    status: 'live',
                    syncing: syncData,
                    blockNumber: blockNumber,
                    blockNumberBehind: 0,
                    peers: peers,
                    pingMs: ping,
                    node: node,
                    i: idx,
                };
            }
            catch (error) {
                return {
                    url,
                    status: 'error',
                    error: error,
                    peers: 0,
                    i: idx,
                };
            }
        }).toArrayAsync();
        let max = (0, alot_1.default)(nodes).max(x => x.syncing?.highestBlock ?? x.syncing?.HighestBlock ?? x.blockNumber);
        nodes.forEach(node => {
            node.blockNumberBehind = node.blockNumber - max;
        });
        return nodes;
    }
    // callSubscribtion <TResult> (
    //     event: any
    //     , cb: (error, result) => void
    //     , opts?: { preferSafe?: boolean }
    //     , used:  Map<WClient, number> = new  Map<WClient, number>()
    //     , errors = []
    //     , root?: PromiEventWrap
    // ) {
    //     root = root ?? new PromiEventWrap();
    //     let wClient = this.next(used);
    //     if (wClient == null) {
    //         setTimeout(() => {
    //             let error = new Error('Clients not found');
    //             root.emit('error', error);
    //             root.reject(error);
    //         });
    //         return root as any as TResult;
    //     }
    //     let promiEvent = wClient.callSubscription(fn);
    //     root.bind(promiEvent);
    //     promiEvent.on('error', error => {
    //         if (ErrorUtil.isConnectionFailed(error)) {
    //             this.callPromiEvent(
    //                 fn, opts, used, errors, root
    //             );
    //             return;
    //         }
    //         root.emit('error', error);
    //         root.reject(error);
    //     });
    //     used.set(wClient, 1);
    //     return root as any as TResult;
    // }
    async next(used, opts, params) {
        let clients = this.clients;
        if (params?.manual !== true) {
            clients = clients.filter(x => x.config.manual !== true);
        }
        if (opts?.ws === true) {
            if (this.ws == null) {
                this.ws = clients.find(x => x.config.url?.startsWith('ws'));
            }
            if (this.ws == null) {
                this.ws = clients.find(x => x.config.web3 != null);
            }
            return this.ws;
        }
        if (opts?.ws === false) {
            clients = clients.filter(x => x.config.url?.startsWith('http'));
        }
        if (this.discoveredPartial === false) {
            await this.discoverLive().ready;
            this.discoveredPartial = true;
        }
        // we check OK clients first
        let okClients = clients.filter(x => x.status === 'ok');
        if (okClients.length === 0) {
            // then switch to at least not off
            let notOffClients = clients.filter(x => x.status !== 'off');
            if (notOffClients) {
                clients = notOffClients;
            }
        }
        else {
            clients = okClients;
        }
        let available = used == null
            ? clients
            : clients.filter(x => used.has(x) === false);
        if (available.length === 0) {
            if (this.discoveredFull === false) {
                await this.discoverLive().completed;
                this.discoveredFull = true;
                return this.next(used, opts);
            }
            return null;
        }
        let healthy = available.filter(x => x.healthy());
        if (opts?.preferSafe === true) {
            let safe = healthy.filter(x => x.config.safe === true);
            if (safe.length > 0) {
                healthy = safe;
            }
        }
        if (opts?.distinct === true) {
            let safe = healthy.filter(x => x.config.distinct === true);
            if (safe.length > 0) {
                healthy = safe;
            }
        }
        let arr = healthy.length > 0
            ? healthy
            : available;
        let i = _number_1.$number.randomInt(0, arr.length);
        let client = arr[i];
        return client;
    }
    /**
     * We may have tens of Nodes to communicate with. Discover LIVE and operating nodes.
     * Resolves when first 3 active nodes are discovered, to prevent waiting for all of them.
     * @returns
     * - Ready Promise - in case 3 clients look good
     * - Complete Promise - when all clients are resolved
     */
    discoverLive() {
        this.clients.forEach(x => x.status = 'ping');
        let ready = new atma_utils_1.class_Dfr();
        let completed = new atma_utils_1.class_Dfr();
        let clientInfos = [];
        let isReady = false;
        let isCompleted = false;
        let clients = this.clients;
        (async () => {
            let nodeInfosAsync = clients.map(async (wClient, idx) => {
                try {
                    let clientInfo = {
                        i: idx,
                        error: null,
                        status: null,
                        blockNumberBehind: 0,
                        blockNumber: await _fn_1.$fn.timeoutPromise(wClient.eth.getBlockNumber(), 20000)
                    };
                    onIntermediateSuccess(clientInfo);
                    return clientInfo;
                }
                catch (error) {
                    return {
                        i: idx,
                        error: error,
                        status: 'off',
                        blockNumberBehind: 0,
                        blockNumber: 0
                    };
                }
            });
            let nodeInfos = await Promise.all(nodeInfosAsync);
            let hasLive = nodeInfos.some(x => x.status === 'ok');
            if (hasLive === false) {
                let messages = nodeInfos.map(x => {
                    let url = clients[x.i]?.config.url;
                    let message = x.error?.message;
                    return `  ${url}: ${message}`;
                }).join('\n');
                let fullMessage = `No live nodes found: \n ${messages}`;
                let error = new Error(fullMessage);
                completed.reject(error);
                ready.reject(error);
                return;
            }
            const blockLatest = (0, alot_1.default)(nodeInfos).max(x => x.blockNumber);
            nodeInfos.forEach(node => {
                node.blockNumberBehind = node.blockNumber - blockLatest;
            });
            nodeInfos.forEach(info => {
                this.clients[info.i].status = isOk(info);
            });
            isCompleted = true;
            completed.resolve();
            if (isReady !== true) {
                isReady = true;
                ready.resolve();
            }
        })();
        function isOk(info) {
            if (info.error) {
                return 'off';
            }
            if (isNaN(info.blockNumber) || info.blockNumberBehind < -200) {
                return 'off';
            }
            return 'ok';
        }
        function onIntermediateSuccess(info) {
            const TOLERATE_BLOCK_COUNT = 5;
            const WAIT_POOL_OK = Math.min(3, clientInfos.length);
            if (isReady === true) {
                return;
            }
            if (clientInfos.push(info) < WAIT_POOL_OK) {
                return;
            }
            let maxBlockNumber = (0, alot_1.default)(clientInfos).max(x => x.blockNumber);
            let ok = [];
            for (let info of clientInfos) {
                let diff = Math.abs(info.blockNumber - maxBlockNumber);
                if (diff <= TOLERATE_BLOCK_COUNT) {
                    ok.push(info);
                }
            }
            if (ok.length >= WAIT_POOL_OK) {
                ok.forEach(info => {
                    clients[info.i].status = 'ok';
                });
                isReady = true;
                ready.resolve();
            }
        }
        return { ready, completed };
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], ClientPool.prototype, "discoverLive", null);
exports.ClientPool = ClientPool;
class WClient {
    constructor(mix) {
        this.lastStatus = 0;
        this.lastDate = new Date(2000);
        this.status = 'ok';
        this.requests = {
            success: 0,
            fail: 0,
            ping: 0
        };
        const hasUrl = 'url' in mix && typeof mix.url === 'string';
        const hasWeb3 = 'web3' in mix && typeof mix.web3 != null;
        if (hasUrl || hasWeb3) {
            this.config = mix;
            if (mix.url) {
                // web3 object
                this.web3 = new web3_1.default(mix.url);
            }
            else if (mix.web3.eth != null) {
                this.web3 = mix.web3;
            }
            else {
                // provider
                this.web3 = new web3_1.default(mix.web3);
            }
        }
        else {
            throw new Error(`Neither Node URL nor Web3 Instance in argument`);
        }
        this.web3.eth.handleRevert = true;
        this.eth = this.web3.eth;
    }
    healthy() {
        if (this.getRequestCount() === 0) {
            return true;
        }
        if (this.requests.fail === 0) {
            return true;
        }
        let health = this.requests.fail / this.getRequestCount();
        if (health > .5) {
            return true;
        }
        if (Date.now() - this.lastDate.getTime() > _date_1.$date.parseTimespan('10m')) {
            return true;
        }
        return false;
    }
    async send(fn) {
        return new Promise((resolve, reject) => {
            let result = fn(this.web3);
            result.then(_ => {
                this.lastStatus = ClientStatus_1.ClientStatus.Ok;
                this.requests.success++;
                resolve({ status: ClientStatus_1.ClientStatus.Ok, result });
            }, error => {
                if (ClientErrorUtil_1.ClientErrorUtil.isConnectionFailed(error)) {
                    this.lastStatus = ClientStatus_1.ClientStatus.NetworkError;
                    this.requests.fail++;
                    resolve({ status: ClientStatus_1.ClientStatus.NetworkError, error });
                }
                return resolve({ status: ClientStatus_1.ClientStatus.CallError, result: error });
            });
        });
    }
    // async call <TResult> (fn: (web3: Web3) => Promise<TResult> ): Promise<{ status: number, result?: TResult }> {
    //     try {
    //         let result = await fn(this.web3);
    //         this.lastStatus = Status.Ok;
    //         this.requests.success++;
    //         return { status: Status.Ok, result };
    //     } catch (error) {
    //         console.log(error);
    //         if (this.isConnectionFailed (error)) {
    //             this.lastStatus = Status.NetworkError;
    //             this.requests.fail++;
    //             return { status: Status.NetworkError, result: error };
    //         }
    //         return { status: Status.CallError, result: error }
    //     }
    // }
    async call(fn) {
        return new Promise((resolve, reject) => {
            let start = Date.now();
            let result = fn(this.web3);
            result.then(_ => {
                let time = Date.now() - start;
                let status = ClientStatus_1.ClientStatus.Ok;
                this.onComplete(status, time);
                resolve({ status, result, time });
            }, error => {
                let time = Date.now() - start;
                let status = ClientStatus_1.ClientStatus.CallError;
                if (ClientErrorUtil_1.ClientErrorUtil.isConnectionFailed(error)) {
                    status = ClientStatus_1.ClientStatus.NetworkError;
                }
                this.onComplete(status, time);
                resolve({ status, error, time });
            });
        });
    }
    callPromiEvent(fn) {
        let result = fn(this.web3);
        result.on('error', error => {
            if (ClientErrorUtil_1.ClientErrorUtil.isConnectionFailed(error)) {
                this.lastStatus = ClientStatus_1.ClientStatus.NetworkError;
                this.requests.fail++;
            }
        });
        result.on('transactionHash', hash => {
            this.lastStatus = ClientStatus_1.ClientStatus.Ok;
            this.requests.success++;
        });
        return result;
    }
    callSubscription(fn) {
        let result = fn(this.web3);
        result.on('error', error => {
            if (ClientErrorUtil_1.ClientErrorUtil.isConnectionFailed(error)) {
                this.lastStatus = ClientStatus_1.ClientStatus.NetworkError;
                this.requests.fail++;
            }
        });
        result.on('transactionHash', hash => {
            this.lastStatus = ClientStatus_1.ClientStatus.Ok;
            this.requests.success++;
        });
        return result;
    }
    getEventStream(address, abi, event, options = {}) {
        let eventAbi = abi.find(x => x.type === 'event' && x.name === event);
        if (eventAbi == null) {
            let events = abi.filter(x => x.type === 'event').map(x => x.name).join(', ');
            throw new Error(`Event "${event}" not present in ABI. Events: ${events}`);
        }
        const contract = new this.eth.Contract(abi, address);
        const stream = contract
            .events[event](options);
        const worker = new ClientEventsStream_1.ClientEventsStream(contract, eventAbi, stream);
        return worker;
    }
    callSync(fn) {
        try {
            let result = fn(this.web3);
            return { status: ClientStatus_1.ClientStatus.Ok, result };
        }
        catch (error) {
            return { status: ClientStatus_1.ClientStatus.CallError, result: error };
        }
    }
    onComplete(status, timeMs) {
        let callCount = this.getRequestCount();
        let ping = this.requests.ping;
        this.lastStatus = status;
        switch (status) {
            case ClientStatus_1.ClientStatus.Ok:
                this.requests.success++;
                break;
            default:
                this.requests.fail++;
                break;
        }
        this.requests.ping = (ping * callCount + timeMs) / (callCount + 1);
    }
    getRequestCount() {
        return this.requests.success + this.requests.fail;
    }
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_ClientPool === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_ClientPool) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_ClientPool, module.exports);
    } else {
        _dequanto_src_clients_ClientPool = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__block;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__block != null ? _dequanto_src_utils__block : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$block = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const BlockDateResolver_1 = _dequanto_src_blocks_BlockDateResolver;
var $block;
(function ($block) {
    function getDate(block) {
        return new Date(Number(block.timestamp) * 1000);
    }
    $block.getDate = getDate;
    async function ensureNumber(mix, client) {
        if (typeof mix === 'number') {
            return mix;
        }
        if (mix instanceof Date) {
            let dateResolver = a_di_1.default.resolve(BlockDateResolver_1.BlockDateResolver, client);
            return await dateResolver.getBlockNumberFor(mix);
        }
        throw new Error(`Invalid getBlockNumber param: ${mix}`);
    }
    $block.ensureNumber = ensureNumber;
})($block = exports.$block || (exports.$block = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__block === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__block) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__block, module.exports);
    } else {
        _dequanto_src_utils__block = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_blocks_BlockDateResolver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_blocks_BlockDateResolver != null ? _dequanto_src_blocks_BlockDateResolver : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDateResolver = void 0;
const _block_1 = _dequanto_src_utils__block;
const alot_1 = __importDefault(require("alot"));
class BlockDateResolver {
    constructor(client) {
        this.client = client;
        this.AVG_INITIAL = {
            eth: 12 * 1000,
            bsc: 3 * 1000,
            polygon: 3 * 1000,
        };
        this.known = [];
    }
    async getBlockNumberFor(date) {
        this.q = date;
        let avg = this.AVG_INITIAL[this.client.platform];
        if (avg == null) {
            throw new Error(`AVG Block Time not defined for ${this.client.platform}`);
        }
        let now = new Date();
        let topBlock = {
            blockNumber: await this.client.getBlockNumberCached(),
            date: now,
            avg,
        };
        this.known.push(topBlock);
        return await this.moveNext(date);
    }
    async moveNext(date) {
        let closestIndex = this.getClosest(date);
        let block = this.known[closestIndex];
        let timeDiff = this.diffTime(block.date, date);
        let timeDistance = Math.abs(timeDiff);
        const BLOCKS_TOLERANCE = 2;
        if (timeDistance <= block.avg * BLOCKS_TOLERANCE) {
            return block.blockNumber;
        }
        if (this.closestTime != null && timeDistance >= this.closestTime) {
            let b = this.known[this.closestIdx];
            return b.blockNumber;
        }
        this.closestTime = timeDistance;
        this.closestIdx = closestIndex;
        let nextInfo = await this.checkPoint(block, timeDiff);
        if (nextInfo == null) {
            return block.blockNumber;
        }
        return this.moveNext(date);
    }
    /**
     * Returns index of the first known block, which is most near to specified block (it can be before or after the specified date).
     */
    getClosest(date) {
        let entry = (0, alot_1.default)(this.known).map(x => [
            this.diffTimeAbs(x.date, date),
            x
        ]).minItem(x => x[0])[1];
        let i = this.known.indexOf(entry);
        return i;
    }
    async checkPoint(anchor, diffTime) {
        let diffCount = Math.round(diffTime / anchor.avg);
        if (diffCount === 0) {
            return null;
        }
        let blockNumber = anchor.blockNumber + diffCount;
        if (blockNumber < 0) {
            throw new Error(`Date Out of range: ${this.q.toISOString()}. Based on the AVG block time, the blockchain was not active on that date`);
        }
        let date = await this.getBlockDate(blockNumber);
        let info = {
            blockNumber: blockNumber,
            date: date,
        };
        this.push(info);
        this.refineAvg();
        return info;
    }
    push(info) {
        for (let i = 0; i < this.known.length; i++) {
            let x = this.known[i];
            if (info.date < x.date) {
                this.known.splice(i, 0, info);
                return;
            }
        }
        this.known.push(info);
    }
    /** Loads the block and gets the Date of the block */
    async getBlockDate(blockNumber) {
        let block = await this.client.getBlock(blockNumber);
        if (block == null) {
            throw new Error(`Block not loaded: ${blockNumber}`);
        }
        let date = _block_1.$block.getDate(block);
        return date;
    }
    /** Returns SIGNED time in milliseconds between two dates. Negative values when t2 < t1 */
    diffTime(t1, t2) {
        return (t2.getTime() - t1.getTime());
    }
    /** Returns ABSOLUTE time in milliseconds between two dates.  */
    diffTimeAbs(t1, t2) {
        return Math.abs(this.diffTime(t1, t2));
    }
    /** Returns AVG block count between two dates */
    getAvgBlockCountBetween(b1, b2) {
        let diff = this.diffTimeAbs(b1.date, b2.date);
        return Math.round(diff / Math.abs(b2.blockNumber - b1.blockNumber));
    }
    /** Having N>1 blocks we can better find out the AVG block time */
    refineAvg() {
        for (let i = 1; i < this.known.length; i++) {
            let info = this.known[i];
            let prev = this.known[i - 1];
            info.avg = this.getAvgBlockCountBetween(prev, info);
            if (i === 1) {
                this.known[0].avg = info.avg;
            }
        }
    }
}
exports.BlockDateResolver = BlockDateResolver;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_blocks_BlockDateResolver === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_blocks_BlockDateResolver) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_blocks_BlockDateResolver, module.exports);
    } else {
        _dequanto_src_blocks_BlockDateResolver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__txData;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__txData != null ? _dequanto_src_utils__txData : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$txData = void 0;
var $txData;
(function ($txData) {
    function getJson(txData, defaults) {
        let json = {
            ...txData,
            type: txData.type ?? defaults?.defaultTxType,
            chainId: txData.chainId ?? defaults?.chainId
        };
        if (json.type === 1) {
            // delete `type` field in case old tx type. Some old nodes may reject type field presence
            delete json.type;
        }
        return json;
    }
    $txData.getJson = getJson;
})($txData = exports.$txData || (exports.$txData = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__txData === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__txData) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__txData, module.exports);
    } else {
        _dequanto_src_utils__txData = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_Web3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_Web3Client != null ? _dequanto_src_clients_Web3Client : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Client = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const memd_1 = __importDefault(require("memd"));
const ClientPool_1 = _dequanto_src_clients_ClientPool;
const ClientPoolStats_1 = _dequanto_src_clients_ClientPoolStats;
const ethers_1 = require("ethers");
const _number_1 = _dequanto_src_utils__number;
const BlockDateResolver_1 = _dequanto_src_blocks_BlockDateResolver;
const _txData_1 = _dequanto_src_utils__txData;
const _logger_1 = _dequanto_src_utils__logger;
const atma_utils_1 = require("atma-utils");
class Web3Client {
    constructor(mix) {
        this.TIMEOUT = 3 * 60 * 1000;
        this.defaultTxType = 2;
        if (Array.isArray(mix)) {
            this.options = { endpoints: mix };
        }
        else if (mix != null) {
            this.options = mix;
        }
        if (this.options.endpoints == null && this.options.web3 == null) {
            console.dir(this.options, { depth: null });
            throw new Error(`Neither Node endpoints nor web3 instance provided`);
        }
        this.pool = new ClientPool_1.ClientPool(this.options);
    }
    async sign(txData, privateKey) {
        let wallet = new ethers_1.Wallet(privateKey);
        let json = _txData_1.$txData.getJson(txData, this);
        let tx = await wallet.signTransaction(json);
        return tx;
    }
    getEventStream(address, abi, event) {
        return this.pool.getEventStream(address, abi, event);
    }
    with(fn) {
        return this.pool.call(fn);
    }
    withSync(fn) {
        return this.pool.callSync(fn);
    }
    async getWeb3(options) {
        return await this.pool.getWeb3(options);
    }
    async getNodeURL(options) {
        return await this.pool.getNodeURL(options);
    }
    async subscribe(...args) {
        let web3 = await this.getWeb3({ ws: true });
        return web3.eth.subscribe(...args);
    }
    readContract(data) {
        let { address, method, abi, options, blockNumber, arguments: params } = data;
        return this.pool.call(async (web3) => {
            let contract = new web3.eth.Contract(abi, address);
            let callArgs = [];
            if (options != null) {
                callArgs[0] = options;
            }
            if (blockNumber != null) {
                callArgs[0] = null;
                callArgs[1] = blockNumber;
            }
            let result = await contract.methods[method](...params).call(...callArgs);
            return result;
        }, {
            trace: ClientPoolStats_1.ClientPoolTrace.createContractCall(address, method, params)
        });
    }
    readContractBatch(requests) {
        let trace = new ClientPoolStats_1.ClientPoolTrace();
        trace.action = `Batch requests: ${requests.map(x => x.address)}`;
        return this.pool.call(async (web3) => {
            let batch = new Web3BatchRequests.BatchRequest(web3, requests);
            return batch.execute();
        }, {
            trace
        });
    }
    encodeParameters(types, paramaters) {
        return this.pool.callSync(web3 => {
            return web3.eth.abi.encodeParameters(types, paramaters);
        });
    }
    getBalance(address, blockNumber) {
        return this.pool.call(async (web3) => {
            let weiStr = await web3.eth.getBalance(address, blockNumber);
            return BigInt(weiStr);
        });
    }
    getTransactionCount(address, type) {
        return this.pool.call(web3 => {
            return web3.eth.getTransactionCount(address, type);
        });
    }
    isSyncing() {
        return this.pool.call(web3 => {
            return web3.eth.isSyncing();
        });
    }
    getTransaction(txHash, opts) {
        return this.pool.call(web3 => {
            return web3.eth.getTransaction(txHash);
        }, opts);
    }
    getTransactions(hashes, opts) {
        return this.pool.call(web3 => {
            let reqs = hashes.map(hash => cb => web3.eth.getTransaction.request(hash, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            return batch.execute();
        }, opts);
    }
    getTransactionReceipt(txHash) {
        return this.pool.call(web3 => {
            return web3.eth.getTransactionReceipt(txHash);
        });
    }
    getTransactionReceipts(hashes) {
        return this.pool.call(web3 => {
            let reqs = hashes.map(hash => cb => web3.eth.getTransactionReceipt.request(hash, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            return batch.execute();
        });
    }
    getBlock(nr) {
        return this.pool.call(web3 => {
            return web3.eth.getBlock(nr);
        });
    }
    getBlocks(nrs) {
        return this.pool.call(web3 => {
            let reqs = nrs.map(nr => cb => web3.eth.getBlock.request(nr, cb));
            let batch = new Web3BatchRequests.BatchRequest(web3, reqs);
            return batch.execute();
        });
    }
    getPendingTransactions() {
        return this.pool.call(web3 => {
            return web3.eth.getPendingTransactions();
        });
    }
    getPoolStatus() {
        return this.pool.call(async (web3) => {
            let eth = web3.eth;
            if (eth.txpool == null) {
                eth.extend({
                    property: 'txpool',
                    methods: [{
                            name: 'content',
                            call: 'txpool_content'
                        }, {
                            name: 'inspect',
                            call: 'txpool_inspect'
                        }, {
                            name: 'status',
                            call: 'txpool_status'
                        }]
                });
            }
            let status = await eth.txpool.status();
            return {
                baseFee: BigInt(status.baseFee),
                pending: Number(status.pending),
                queued: Number(status.queued),
            };
        });
    }
    getStorageAt(address, position, blockNumber) {
        return this.pool.call(web3 => {
            return web3.eth.getStorageAt(address, position, blockNumber);
        });
    }
    getGasPrice() {
        return this.pool.call(web3 => {
            return web3.eth.getGasPrice().then(x => {
                return {
                    price: BigInt(x)
                };
            });
        });
    }
    getGasEstimation(from, tx) {
        return this.pool.call(async (web3) => {
            let txData = {
                from: from,
                to: tx.to,
                value: tx.value,
                data: tx.data,
                nonce: tx.nonce,
            };
            let gasAmount = await web3.eth.estimateGas(txData);
            return gasAmount;
        });
    }
    async getAccounts(options) {
        let web3 = await this.getWeb3(options);
        return web3.eth.getAccounts();
    }
    async getChainId(options) {
        let web3 = await this.getWeb3(options);
        return web3.eth.getChainId();
    }
    async switchChain(params, options) {
        let web3 = await this.getWeb3(options);
        if (typeof web3.eth.currentProvider.request !== 'function') {
            throw new Error(`Current provider doesn't have request method`);
        }
        return web3.eth.currentProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: _number_1.$number.toHex(params.chainId) }],
        });
    }
    sendSignedTransaction(signedTxBuffer) {
        return this.pool.callPromiEvent(web3 => {
            return web3.eth.sendSignedTransaction(signedTxBuffer);
        }, { preferSafe: true, distinct: true });
    }
    sendTransaction(data) {
        return this.pool.callPromiEvent(web3 => {
            return web3.eth.sendTransaction(data);
        }, { preferSafe: true, distinct: true });
    }
    getBlockNumber() {
        return this.pool.call(web3 => {
            return web3.eth.getBlockNumber();
        });
    }
    getBlockNumberCached() {
        return this.pool.call(web3 => {
            return web3.eth.getBlockNumber();
        });
    }
    async getPastLogs(options) {
        const getBlock = async (block, $default) => {
            if (block == null) {
                return $default;
            }
            if (block instanceof Date) {
                let resolver = a_di_1.default.resolve(BlockDateResolver_1.BlockDateResolver, this);
                return resolver.getBlockNumberFor(block);
            }
            return block;
        };
        const getBlockNumber = async (block) => {
            if (typeof block === 'number') {
                return block;
            }
            if (block == null || block === 'latest') {
                return this.getBlockNumber();
            }
            if (block.startsWith('0x')) {
                return Number(block);
            }
            throw new Error(`Invalid block number`);
        };
        options.fromBlock = await getBlock(options.fromBlock, 0);
        options.toBlock = await getBlock(options.toBlock, 'latest');
        options.topics = options.topics?.map(topic => {
            if (typeof topic === 'string' && topic.startsWith('0x')) {
                return '0x' + topic.substring(2).padStart(64, '0');
            }
            return topic;
        });
        let MAX = this.pool.getOptionForFetchableRange();
        let [fromBlock, toBlock] = await Promise.all([
            getBlockNumber(options.fromBlock),
            getBlockNumber(options.toBlock),
        ]);
        return await RangeWorker.fetchWithLimits(this, options, {
            maxBlockRange: MAX,
            maxResultCount: null,
        }, {
            fromBlock,
            toBlock
        });
    }
    getNodeInfos() {
        return this.pool.getNodeInfos();
    }
    getNodeStats() {
        return this.pool.getNodeStats();
    }
    static url(mix, opts) {
        const Ctor = this;
        let options;
        if (typeof mix === 'string') {
            options = { endpoints: [{ url: mix }] };
        }
        else if (Array.isArray(mix)) {
            options = { endpoints: mix };
        }
        else {
            options = mix;
        }
        const param = {
            ...options,
            ...(opts ?? {})
        };
        return new Ctor(param);
    }
}
__decorate([
    memd_1.default.deco.memoize({ maxAge: 30 })
], Web3Client.prototype, "getBlockNumberCached", null);
exports.Web3Client = Web3Client;
var Web3BatchRequests;
(function (Web3BatchRequests) {
    function contractRequest(web3, request, onComplete) {
        let { contract, method, params, callArgs } = prepair(web3, request);
        return contract.methods[method](...params).call.request(...callArgs, onComplete);
    }
    Web3BatchRequests.contractRequest = contractRequest;
    function call(web3, request) {
        let { contract, method, params, callArgs } = prepair(web3, request);
        return contract.methods[method](...params).call(...callArgs);
    }
    Web3BatchRequests.call = call;
    class BatchRequest {
        //-private wasCompleted = false;
        constructor(web3, requests) {
            this.web3 = web3;
            this.requests = requests;
            this.promise = new atma_utils_1.class_Dfr();
            this.results = new Array(this.requests.length);
            this.awaitables = this.requests.length;
        }
        async execute() {
            if (this.requests.length === 0) {
                return this.promise.resolve(this.results);
            }
            let web3 = this.web3;
            let batch = new web3.BatchRequest();
            let arr = this.requests.map((req, i) => {
                const cb = (err, result) => {
                    this.onCompleted(i, err, result);
                };
                if (typeof req === 'function') {
                    return req(cb);
                }
                return contractRequest(web3, req, cb);
            });
            arr.forEach(req => {
                batch.add(req);
            });
            batch.execute();
            return this.promise;
        }
        onCompleted(i, error, result) {
            this.results[i] = result ?? error;
            if (--this.awaitables === 0) {
                this.promise.resolve(this.results);
            }
        }
    }
    Web3BatchRequests.BatchRequest = BatchRequest;
    function prepair(web3, request) {
        let { address, method, abi, options, blockNumber, arguments: params } = request;
        let contract = new web3.eth.Contract(abi, address);
        let callArgs = [];
        if (options != null) {
            callArgs[0] = options;
        }
        if (blockNumber != null) {
            callArgs[0] = null;
            callArgs[1] = blockNumber;
        }
        return { contract, method, params, callArgs };
    }
})(Web3BatchRequests || (Web3BatchRequests = {}));
var RangeWorker;
(function (RangeWorker) {
    async function fetchWithLimits(client, options, limits, ranges) {
        let { fromBlock, toBlock } = ranges;
        let { maxBlockRange } = limits;
        let range = toBlock - fromBlock;
        if (maxBlockRange == null || range <= maxBlockRange) {
            return fetch(client, options, ranges, limits);
        }
        let logs = [];
        let cursor = fromBlock;
        let pages = Math.ceil(range / maxBlockRange);
        let page = 0;
        let complete = false;
        while (complete === false) {
            ++page;
            let end = cursor + maxBlockRange;
            if (end > toBlock) {
                end = options.toBlock;
                complete = true;
            }
            _logger_1.$logger.log(`Get past logs paged: ${page}/${pages} (Block start: ${cursor}). Loaded ${logs.length}`);
            let paged = await fetch(client, options, {
                fromBlock: cursor,
                toBlock: end ?? undefined,
            }, limits);
            logs.push(...paged);
            cursor += maxBlockRange + 1;
        }
        return logs;
    }
    RangeWorker.fetchWithLimits = fetchWithLimits;
    ;
    async function fetch(client, options, range, knownLimits) {
        try {
            let paged = await client.pool.call(web3 => web3.eth.getPastLogs({
                ...options,
                fromBlock: range.fromBlock,
                toBlock: range.toBlock ?? undefined,
            }));
            return paged;
        }
        catch (error) {
            /**
             * query returned more than 10000 results
             */
            _logger_1.$logger.log(`Range worker request: ${range.fromBlock}-${range.toBlock}. ${error.message.trim()}. Splitting range.`);
            let matchCountLimit = /(?<count>\d+) results/.exec(error.message);
            if (matchCountLimit) {
                let count = Number(matchCountLimit.groups.count);
                let half = Math.floor((range.toBlock - range.fromBlock) / 2);
                let rangeA = {
                    fromBlock: range.fromBlock,
                    toBlock: range.fromBlock + half
                };
                let arr1 = await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxResultCount: count
                }, rangeA);
                let rangeB = {
                    fromBlock: range.fromBlock + half,
                    toBlock: range.toBlock
                };
                let arr2 = await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxResultCount: count
                }, rangeB);
                return [...(arr1 ?? []), ...(arr2 ?? [])];
            }
            let maxRangeMatch = /\b(?<maxRange>\d+)\b/.exec(error.message);
            if (maxRangeMatch && knownLimits.maxBlockRange == null) {
                // handle unknown range, otherwise throw
                let rangeLimit = Number(maxRangeMatch.groups.maxRange);
                return await fetchWithLimits(client, options, {
                    ...knownLimits,
                    maxBlockRange: rangeLimit
                }, range);
            }
            throw error;
        }
    }
})(RangeWorker || (RangeWorker = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_Web3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_Web3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_Web3Client, module.exports);
    } else {
        _dequanto_src_clients_Web3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_utils_ClientEndpoints;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_utils_ClientEndpoints != null ? _dequanto_src_clients_utils_ClientEndpoints : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEndpoints = void 0;
var ClientEndpoints;
(function (ClientEndpoints) {
    function filterEndpoints(endpoints, opts) {
        if (opts?.web3) {
            return [];
        }
        if (opts?.endpoints) {
            endpoints = opts.endpoints;
        }
        if (opts == null) {
            return endpoints;
        }
        if (endpoints == null) {
            return null;
        }
        return endpoints.filter(endpoint => {
            if (opts.type != null && endpoint.type !== opts.type) {
                return false;
            }
            if (opts.safe != null && endpoint.safe !== opts.safe) {
                return false;
            }
            if (opts.ws === true && endpoint.url.startsWith('ws') === false) {
                return false;
            }
            return true;
        });
    }
    ClientEndpoints.filterEndpoints = filterEndpoints;
})(ClientEndpoints = exports.ClientEndpoints || (exports.ClientEndpoints = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_utils_ClientEndpoints === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_utils_ClientEndpoints) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_utils_ClientEndpoints, module.exports);
    } else {
        _dequanto_src_clients_utils_ClientEndpoints = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_BscWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_BscWeb3Client != null ? _dequanto_src_clients_BscWeb3Client : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
class BscWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(_config_1.$config.get('web3.bsc.endpoints'), opts)
        });
        this.platform = 'bsc';
        this.chainId = this.options.chainId ?? 56;
        this.chainToken = 'BNB';
        this.defaultGasLimit = 2000000;
    }
}
exports.BscWeb3Client = BscWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_BscWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_BscWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_BscWeb3Client, module.exports);
    } else {
        _dequanto_src_clients_BscWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_EthWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_EthWeb3Client != null ? _dequanto_src_clients_EthWeb3Client : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
class EthWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(opts?.endpoints ?? _config_1.$config.get(`web3.${opts?.platform ?? 'eth'}.endpoints`), opts)
        });
        this.platform = this.options.platform ?? 'eth';
        this.chainId = this.options.chainId ?? 1;
        this.chainToken = this.options.chainToken ?? 'ETH';
        this.TIMEOUT = 15 * 60 * 1000;
        this.defaultGasLimit = 2000000;
    }
}
exports.EthWeb3Client = EthWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_EthWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_EthWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_EthWeb3Client, module.exports);
    } else {
        _dequanto_src_clients_EthWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__bigint;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__bigint != null ? _dequanto_src_utils__bigint : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bigint = void 0;
const _is_1 = _dequanto_src_utils__is;
var $bigint;
(function ($bigint_1) {
    $bigint_1.ETHER_DECIMALS = 18;
    $bigint_1.GWEI_DECIMALS = 9;
    function max(...args) {
        let max = null;
        for (let i = 0; i < args.length; i++) {
            let val = args[i];
            if (max == null || max < val) {
                max = val;
            }
        }
        return max;
    }
    $bigint_1.max = max;
    function min(...args) {
        let min = null;
        for (let i = 0; i < args.length; i++) {
            let val = args[i];
            if (min == null || min > val) {
                min = val;
            }
        }
        return min;
    }
    $bigint_1.min = min;
    function toBigInt(amount) {
        if (typeof amount === 'bigint') {
            return amount;
        }
        if (typeof amount === 'string') {
            amount = Number(amount);
        }
        return BigInt(Math.round(amount));
    }
    $bigint_1.toBigInt = toBigInt;
    function ensureWei(amount, decimals) {
        if (typeof amount === 'number') {
            return toWei(amount, decimals);
        }
        return amount;
    }
    $bigint_1.ensureWei = ensureWei;
    function toWei(amount, decimals = $bigint_1.ETHER_DECIMALS) {
        let decimalsCount = Number(decimals);
        if (typeof amount === 'number') {
            let $exp = 0;
            while ((amount * 10 ** $exp) % 1 !== 0 && $exp < decimalsCount) {
                $exp++;
            }
            decimalsCount -= $exp;
            amount *= 10 ** $exp;
            if (amount % 1 !== 0) {
                amount = Math.round(amount);
            }
        }
        let $amount = BigInt(amount);
        let $decimals = BigInt(decimalsCount);
        return $amount * 10n ** $decimals;
    }
    $bigint_1.toWei = toWei;
    function toWeiFromGwei(amount) {
        return toWei(amount, $bigint_1.GWEI_DECIMALS);
    }
    $bigint_1.toWeiFromGwei = toWeiFromGwei;
    function toEther(amount, decimals = $bigint_1.ETHER_DECIMALS, round = 100000n) {
        let $decimals = BigInt(decimals);
        let $amount = BigInt(amount);
        let val = $amount * round / 10n ** $decimals;
        if (val < Number.MAX_SAFE_INTEGER) {
            return Number(val) / Number(round);
        }
        throw new Error(`Ether overflow: ${val}. Decimals: ${decimals}`);
    }
    $bigint_1.toEther = toEther;
    function toEtherSafe(amount, decimals = $bigint_1.ETHER_DECIMALS, round = 100000n) {
        let $decimals = BigInt(decimals);
        let $amount = BigInt(amount);
        let val = $amount * round / 10n ** $decimals;
        if (val < Number.MAX_SAFE_INTEGER) {
            return Number(val) / Number(round);
        }
        return val / round;
    }
    $bigint_1.toEtherSafe = toEtherSafe;
    function toHex(num) {
        if (num == null) {
            return '0x0';
        }
        ;
        if (typeof num === 'string') {
            if (num.startsWith('0x')) {
                return num;
            }
            try {
                num = BigInt(num);
            }
            catch (error) {
                throw new Error(`Invalid BigInt ${num}`);
            }
        }
        return `0x${num.toString(16)}`;
    }
    $bigint_1.toHex = toHex;
    function toGweiFromWei(val) {
        return toEther(val, $bigint_1.GWEI_DECIMALS);
    }
    $bigint_1.toGweiFromWei = toGweiFromWei;
    function toGweiFromEther(val) {
        return toWei(val, $bigint_1.GWEI_DECIMALS);
    }
    $bigint_1.toGweiFromEther = toGweiFromEther;
    function multWithFloat(bigInt, float) {
        let $bigint = bigInt;
        let $number = float;
        let value = 1n;
        while (Math.floor($number) !== $number) {
            $number *= 10;
            $bigint *= 10n;
            value *= 100n;
        }
        return $bigint * BigInt(Math.floor($number)) / value;
    }
    $bigint_1.multWithFloat = multWithFloat;
    function divToFloat(a, b, precision = 100000n) {
        _is_1.$is.BigInt(a);
        _is_1.$is.BigInt(b);
        let r = (a * precision) / b;
        if (r < Number.MAX_SAFE_INTEGER) {
            return Number(r) / Number(precision);
        }
        throw new Error(`divToFloat failed by MAX_SAFE_INTEGER result ${r}. ${a}/${b}`);
    }
    $bigint_1.divToFloat = divToFloat;
    function pow(basis, exponent) {
        let $base = typeof basis === 'number' ? BigInt(Math.round(basis)) : basis;
        let $exp = typeof exponent === 'number' ? BigInt(exponent) : exponent;
        return $base ** $exp;
    }
    $bigint_1.pow = pow;
})($bigint = exports.$bigint || (exports.$bigint = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__bigint === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__bigint) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__bigint, module.exports);
    } else {
        _dequanto_src_utils__bigint = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_PolyWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_PolyWeb3Client != null ? _dequanto_src_clients_PolyWeb3Client : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolyWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
const _bigint_1 = _dequanto_src_utils__bigint;
class PolyWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(_config_1.$config.get('web3.polygon.endpoints'), opts)
        });
        this.platform = 'polygon';
        this.chainId = this.options.chainId ?? 137;
        this.chainToken = 'MATIC';
        this.defaultGasLimit = 2000000;
    }
    async getGasPrice() {
        let { price, base, priority } = await super.getGasPrice();
        price = _bigint_1.$bigint.min(price, _bigint_1.$bigint.toWei(60, _bigint_1.$bigint.GWEI_DECIMALS));
        // Use minimum gas price as 15 gwei (network sometimes returns too low fees)
        let gasPrice = _bigint_1.$bigint.max(price, _bigint_1.$bigint.toWei(28, _bigint_1.$bigint.GWEI_DECIMALS));
        return {
            price: gasPrice,
            base: gasPrice,
            priority: gasPrice
        };
    }
}
exports.PolyWeb3Client = PolyWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_PolyWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_PolyWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_PolyWeb3Client, module.exports);
    } else {
        _dequanto_src_clients_PolyWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_arbitrum_ArbWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_arbitrum_ArbWeb3Client != null ? _dequanto_src_chains_arbitrum_ArbWeb3Client : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
class ArbWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(_config_1.$config.get('web3.arbitrum.endpoints'), opts)
        });
        this.platform = 'arbitrum';
        this.chainId = this.options.chainId ?? 42161;
        this.chainToken = 'ETH';
        this.TIMEOUT = 15 * 60 * 1000;
        this.defaultGasLimit = 2000000;
    }
}
exports.ArbWeb3Client = ArbWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_arbitrum_ArbWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_arbitrum_ArbWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_arbitrum_ArbWeb3Client, module.exports);
    } else {
        _dequanto_src_chains_arbitrum_ArbWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_xdai_XDaiWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_xdai_XDaiWeb3Client != null ? _dequanto_src_chains_xdai_XDaiWeb3Client : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDaiWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
const memd_1 = __importDefault(require("memd"));
const axios_1 = __importDefault(require("axios"));
const _bigint_1 = _dequanto_src_utils__bigint;
class XDaiWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(_config_1.$config.get('web3.xdai.endpoints'), opts)
        });
        this.platform = 'xdai';
        this.chainId = this.options.chainId ?? 100;
        this.chainToken = 'XDAI';
        this.defaultGasLimit = 500000;
        this.defaultTxType = 1;
    }
    async getGasPrice() {
        let gasPrice;
        try {
            gasPrice = await this.loadGasPrice();
        }
        catch (err) {
            let { price } = await super.getGasPrice();
            gasPrice = price;
        }
        // MIN 20gwei, max: 80gwei
        const MAX = _bigint_1.$bigint.toWeiFromGwei(80);
        const MIN = _bigint_1.$bigint.toWeiFromGwei(20);
        if (gasPrice < MIN)
            gasPrice = MIN;
        if (gasPrice > MAX)
            gasPrice = MAX;
        return {
            price: gasPrice
        };
    }
    async loadGasPrice() {
        let resp = await axios_1.default.get(`https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle`);
        let avg = resp.data?.average;
        if (avg) {
            return _bigint_1.$bigint.toWeiFromGwei(avg);
        }
        throw new Error(`Field is missing`);
    }
}
__decorate([
    memd_1.default.deco.memoize({ maxAge: 10 })
], XDaiWeb3Client.prototype, "loadGasPrice", null);
exports.XDaiWeb3Client = XDaiWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_xdai_XDaiWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_xdai_XDaiWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_xdai_XDaiWeb3Client, module.exports);
    } else {
        _dequanto_src_chains_xdai_XDaiWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_HardhatWeb3Client;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_HardhatWeb3Client != null ? _dequanto_src_clients_HardhatWeb3Client : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatWeb3Client = void 0;
const _config_1 = _dequanto_src_utils__config;
const Web3Client_1 = _dequanto_src_clients_Web3Client;
const ClientEndpoints_1 = _dequanto_src_clients_utils_ClientEndpoints;
// https://hardhat.org/hardhat-network/reference/
class HardhatWeb3Client extends Web3Client_1.Web3Client {
    constructor(opts) {
        super({
            ...(opts ?? {}),
            endpoints: ClientEndpoints_1.ClientEndpoints.filterEndpoints(_config_1.$config.get('web3.hardhat.endpoints'), opts)
        });
        this.platform = 'hardhat';
        this.chainId = this.options.chainId ?? 1337;
        this.chainToken = 'ETH';
        this.TIMEOUT = 5 * 60 * 1000;
        this.defaultGasLimit = 2000000;
    }
}
exports.HardhatWeb3Client = HardhatWeb3Client;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_HardhatWeb3Client === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_HardhatWeb3Client) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_HardhatWeb3Client, module.exports);
    } else {
        _dequanto_src_clients_HardhatWeb3Client = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_hardhat_HardhatProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_hardhat_HardhatProvider != null ? _dequanto_src_hardhat_HardhatProvider : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatProvider = void 0;
const memd_1 = __importDefault(require("memd"));
const HardhatWeb3Client_1 = _dequanto_src_clients_HardhatWeb3Client;
const atma_utils_1 = require("atma-utils");
const atma_io_1 = require("atma-io");
const ethers_1 = require("ethers");
const _logger_1 = _dequanto_src_utils__logger;
class HardhatProvider {
    constructor() {
        /* lazy load */
        this.hh = require('hardhat');
        if (this.hh.ethers == null) {
            throw new Error(`hardhat-ethers plugin should be installed and included in hardhat.config.js`);
        }
        if (this.hh.web3 == null) {
            throw new Error(`hardhat-web3 plugin should be installed and included in hardhat.config.js`);
        }
    }
    client(network = 'hardhat') {
        if (network == 'localhost') {
            return new HardhatWeb3Client_1.HardhatWeb3Client({
                endpoints: [
                    { url: 'http://127.0.0.1:8545' },
                    { url: 'ws://127.0.0.1:8545' }
                ]
            });
        }
        const web3 = this.hh.web3;
        const client = new HardhatWeb3Client_1.HardhatWeb3Client({ web3 });
        return client;
    }
    deployer(index = 0) {
        const ethers = this.hh.ethers;
        const accounts = this.hh.config.networks.hardhat.accounts;
        const wallet = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + `/${index}`);
        return {
            key: wallet.privateKey,
            address: wallet.address,
        };
    }
    async deployClass(Ctor, options) {
        let ethers = this.hh.ethers;
        let client = options?.client ?? this.client();
        let signer = options?.deployer ?? this.deployer();
        let params = options?.arguments ?? [];
        let Factory = await this.getFactory([Ctor.name], client, signer);
        const contract = await Factory.deploy(...params);
        const receipt = await contract.deployed();
        _logger_1.$logger.log(`Contract ${Ctor.name} deployed to ${contract.address}`);
        return new Ctor(contract.address, client);
    }
    async deploySol(solContractPath, options) {
        const client = options?.client ?? this.client();
        const args = options?.arguments ?? [];
        const signer = options?.deployer ?? this.deployer();
        const dir = solContractPath.replace(/[^\/]+$/, '');
        const filename = /(?<filename>[^\/]+)\.\w+$/.exec(solContractPath)?.groups.filename;
        if (filename == null) {
            throw new Error(`Filename not extracted from ${solContractPath}`);
        }
        await this.hh.run('compile', {
            sources: dir
        });
        let output = atma_utils_1.class_Uri.combine('./artifacts/', solContractPath, `${filename}.json`);
        let { abi, bytecode } = await atma_io_1.File.readAsync(output);
        let Factory = await this.getFactory([abi, bytecode], client, signer);
        const contract = await Factory.deploy(...args);
        const receipt = await contract.deployed();
        return {
            contract,
            abi
        };
    }
    getEthersProvider(client) {
        if (client.options.web3) {
            let ethers = this.hh.ethers;
            return ethers.provider;
        }
        let url = client.options?.endpoints[0].url;
        return new ethers_1.ethers.providers.JsonRpcProvider(url);
    }
    async getFactory(factoryArgs, client, signer) {
        let ethers = this.hh.ethers;
        let Factory = await ethers.getContractFactory(...factoryArgs);
        let provider = this.getEthersProvider(client);
        let $signer = 'key' in signer
            ? new ethers.Wallet(signer.key, provider)
            : signer;
        Factory = Factory.connect($signer);
        return Factory;
    }
}
__decorate([
    memd_1.default.deco.memoize()
], HardhatProvider.prototype, "deployer", null);
__decorate([
    memd_1.default.deco.memoize()
], HardhatProvider.prototype, "deployClass", null);
exports.HardhatProvider = HardhatProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_hardhat_HardhatProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_hardhat_HardhatProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_hardhat_HardhatProvider, module.exports);
    } else {
        _dequanto_src_hardhat_HardhatProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_clients_Web3ClientFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_clients_Web3ClientFactory != null ? _dequanto_src_clients_Web3ClientFactory : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3ClientFactory = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const PolyWeb3Client_1 = _dequanto_src_clients_PolyWeb3Client;
const ArbWeb3Client_1 = _dequanto_src_chains_arbitrum_ArbWeb3Client;
const XDaiWeb3Client_1 = _dequanto_src_chains_xdai_XDaiWeb3Client;
const HardhatProvider_1 = _dequanto_src_hardhat_HardhatProvider;
const Config_1 = _dequanto_src_Config;
const _require_1 = _dequanto_src_utils__require;
var Web3ClientFactory;
(function (Web3ClientFactory) {
    function get(platform, opts) {
        switch (platform) {
            case 'bsc':
                return a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client, opts);
            case 'eth':
                return a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client, opts);
            case 'eth:goerli':
                return a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client, {
                    platform: platform,
                    chainId: 5,
                    ...(opts ?? {})
                });
            case 'polygon':
                return a_di_1.default.resolve(PolyWeb3Client_1.PolyWeb3Client, opts);
            case 'arbitrum':
                return a_di_1.default.resolve(ArbWeb3Client_1.ArbWeb3Client, opts);
            case 'xdai':
                return a_di_1.default.resolve(XDaiWeb3Client_1.XDaiWeb3Client, opts);
            case 'hardhat':
                return a_di_1.default.resolve(HardhatProvider_1.HardhatProvider).client('localhost');
            default:
                let cfg = Config_1.config.web3[platform];
                if (cfg != null) {
                    return createEVMClient({ platform, ...cfg });
                }
                throw new Error(`Unsupported platform ${platform} for web3 client`);
        }
    }
    Web3ClientFactory.get = get;
})(Web3ClientFactory = exports.Web3ClientFactory || (exports.Web3ClientFactory = {}));
function createEVMClient(opts) {
    _require_1.$require.Numeric(opts.chainId, `ChainID should be numeric. Got ${opts.chainId}`);
    class Client extends EthWeb3Client_1.EthWeb3Client {
        constructor() {
            super({
                platform: opts.platform,
                chainId: Number(opts.chainId),
                chainToken: opts.chainToken,
                endpoints: opts.endpoints
            });
        }
    }
    return new Client();
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_clients_Web3ClientFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_clients_Web3ClientFactory) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_clients_Web3ClientFactory, module.exports);
    } else {
        _dequanto_src_clients_Web3ClientFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory != null ? _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChainExplorerFactory = void 0;
const alot_1 = __importDefault(require("alot"));
const memd_1 = __importDefault(require("memd"));
const axios_1 = __importDefault(require("axios"));
const _logger_1 = _dequanto_src_utils__logger;
const _promise_1 = _dequanto_src_utils__promise;
const _address_1 = _dequanto_src_utils__address;
const _require_1 = _dequanto_src_utils__require;
const Web3ClientFactory_1 = _dequanto_src_clients_Web3ClientFactory;
const _config_1 = _dequanto_src_utils__config;
var BlockChainExplorerFactory;
(function (BlockChainExplorerFactory) {
    function create(opts) {
        const client = new Client();
        opts = ensureDefaults(opts);
        return class {
            constructor(platform) {
                this.platform = platform;
                this.localDb = opts.CONTRACTS;
                this.config = opts.getConfig(this.platform);
                this.getContractAbi = memd_1.default.fn.memoize(this.getContractAbi, {
                    trackRef: true,
                    persistance: new memd_1.default.FsTransport({
                        path: opts.ABI_CACHE
                    })
                });
                this.getContractSource = memd_1.default.fn.memoize(this.getContractSource, {
                    trackRef: true,
                    persistance: new memd_1.default.FsTransport({
                        path: opts.ABI_CACHE.replace('.json', '-source.json')
                    })
                });
            }
            async getContractMeta(q) {
                q = q.toLowerCase();
                let info = this.localDb.find(x => x.address.toLowerCase() === q || x.name?.toLowerCase() === q);
                return info;
            }
            async getContractAbi(address, params) {
                let info = await this.getContractMeta(address);
                if (info?.proxy) {
                    address = info.proxy;
                }
                let url = `${this.config.host}/api?module=contract&action=getabi&address=${address}&apikey=${this.config.key}`;
                let abi;
                try {
                    abi = await client.get(url);
                }
                catch (err) {
                    let addressByByteCode = await this.getSimilarContract(address);
                    if (addressByByteCode != null) {
                        _logger_1.$logger.log(`Found similar byte code address: ${addressByByteCode}`);
                        return this.getContractAbi(addressByByteCode);
                    }
                    throw err;
                }
                let abiJson = JSON.parse(abi);
                if (params?.implementation) {
                    if (/0x.{64}/.test(params.implementation)) {
                        let web3 = opts.getWeb3(this.platform);
                        let uin256Hex = await web3.getStorageAt('0x5a58505a96d1dbf8df91cb21b54419fc36e93fde', `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`);
                        let hex = uin256Hex.replace(/0x0+/, '0x');
                        return this.getContractAbi(hex);
                    }
                    throw new Error(`Implement ${params.implementation} support`);
                }
                if (isOpenZeppelinProxy(abiJson)) {
                    let web3 = opts.getWeb3(this.platform);
                    // (BigInt($contract.keccak256("eip1967.proxy.implementation")) - 1n).toString(16);
                    let uint256Hex = await web3.getStorageAt(address, `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`);
                    if (_address_1.$address.isEmpty(uint256Hex)) {
                        // keccak-256 hash of "org.zeppelinos.proxy.implementation"
                        uint256Hex = await web3.getStorageAt(address, `0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3`);
                    }
                    let hex = uint256Hex.replace(/0x0+/, '0x');
                    return this.getContractAbi(hex);
                }
                if (hasImplementationSlot(abiJson)) {
                    let web3 = opts.getWeb3(this.platform);
                    let uin256Hex = await web3.readContract({
                        address: address,
                        abi: abiJson,
                        method: 'implementation',
                        arguments: []
                    });
                    let hex = uin256Hex.replace(/0x0+/, '0x');
                    return this.getContractAbi(hex);
                }
                if (hasTargetSlot(abiJson)) {
                    let web3 = opts.getWeb3(this.platform);
                    let uin256Hex = await web3.readContract({
                        address: address,
                        abi: abiJson,
                        method: 'getTarget',
                        arguments: []
                    });
                    let hex = uin256Hex.replace(/0x0+/, '0x');
                    return this.getContractAbi(hex);
                }
                return { abi, implementation: address };
            }
            async getContractSource(address) {
                let url = `${this.config.host}/api?module=contract&action=getsourcecode&address=${address}&apikey=${this.config.key}`;
                let result = await client.get(url);
                return Array.isArray(result) ? result[0] : result;
            }
            async getTransactions(addr, params) {
                return this.loadTxs('txlist', addr, params);
            }
            async getTransactionsAll(addr, params) {
                return this.loadTxsAll('txlist', addr, params);
            }
            async getInternalTransactions(addr, params) {
                return this.loadTxs('txlistinternal', addr, params);
            }
            async getInternalTransactionsAll(addr) {
                return this.loadTxsAll('txlistinternal', addr);
            }
            async getErc20Transfers(addr, fromBlockNumber) {
                let events = await this.loadTxs('tokentx', addr, { fromBlockNumber });
                events.forEach(transfer => {
                    transfer.timeStamp = new Date((Number(transfer.timeStamp) * 1000));
                    transfer.value = BigInt(transfer.value);
                    transfer.blockNumber = Number(transfer.blockNumber);
                    transfer.tokenDecimal = Number(transfer.tokenDecimal);
                });
                return events;
            }
            async getErc20TransfersAll(addr, fromBlockNumber) {
                let events = await this.loadTxsAll('tokentx', addr);
                events.forEach(transfer => {
                    transfer.timeStamp = new Date((Number(transfer.timeStamp) * 1000));
                    transfer.value = BigInt(transfer.value);
                    transfer.blockNumber = Number(transfer.blockNumber);
                    transfer.tokenDecimal = Number(transfer.tokenDecimal);
                });
                return events;
            }
            async getSimilarContract(address) {
                let url = `${this.config.www}/address/${address}#code`;
                let html = await client.getHtml(url);
                let rgx = /This contract matches/ig;
                let match = rgx.exec(html);
                if (match == null) {
                    return null;
                }
                let rgxAddress = /0x[a-f\d]{40}/g;
                rgxAddress.lastIndex = match.index;
                let matchAddress = rgxAddress.exec(html);
                if (matchAddress == null) {
                    return null;
                }
                return matchAddress[0];
            }
            async loadTxs(type, address, params) {
                let url = `${this.config.host}/api?module=account&action=${type}&address=${address}&sort=${params.sort ?? 'desc'}&apikey=${this.config.key}`;
                if (params.fromBlockNumber != null) {
                    url += `&startblock=${params.fromBlockNumber}`;
                }
                if (params.page != null) {
                    url += `&page=${params.page}`;
                }
                if (params.size != null) {
                    url += `&offset=${params.size}`;
                }
                let txs = await client.get(url);
                return txs;
            }
            async loadTxsAll(type, address, params) {
                let page = 1;
                let size = 1000;
                let out = [];
                let fromBlockNumber = params?.fromBlockNumber;
                while (true) {
                    let arr = await this.loadTxs(type, address, { fromBlockNumber, sort: 'asc' });
                    out.push(...arr);
                    _logger_1.$logger.log(`Got transactions(${type}) for ${address}. Page: ${arr.length}; Received: ${out.length}. Latest Block: ${fromBlockNumber}`);
                    if (arr.length < size) {
                        break;
                    }
                    page++;
                    fromBlockNumber = Number(arr[arr.length - 1].blockNumber);
                }
                return (0, alot_1.default)(out).distinctBy(x => x.hash).toArray();
            }
        };
    }
    BlockChainExplorerFactory.create = create;
})(BlockChainExplorerFactory = exports.BlockChainExplorerFactory || (exports.BlockChainExplorerFactory = {}));
function isOpenZeppelinProxy(abi) {
    let $interface = ['upgradeTo', 'implementation'];
    return $interface.every(name => {
        return hasMethod(abi, name);
    });
}
function hasImplementationSlot(abi) {
    let $required = ['implementation'];
    let hasRequired = $required.every(name => {
        return hasMethod(abi, name);
    });
    if (hasRequired === false) {
        return false;
    }
    let $some = ['proxyOwner', 'proxyType'];
    let hasOneOf = $some.some(name => {
        return hasMethod(abi, name);
    });
    if (hasOneOf === false) {
        return false;
    }
    return true;
}
function hasTargetSlot(abi) {
    let $interface = ['upgrade', 'getTarget'];
    return $interface.every(name => {
        return hasMethod(abi, name);
    });
}
function hasMethod(abi, name) {
    return abi.some(item => item.type === 'function' && item.name === name);
}
function ensureDefaults(opts) {
    let hasNull = opts.ABI_CACHE == null
        || opts.CONTRACTS == null
        || opts.getConfig == null
        || opts.getWeb3 == null;
    if (hasNull === false) {
        return opts;
    }
    let platform = opts.platform;
    _require_1.$require.notNull(platform, `Generic Blockchain Explorer Config should contain platform name`);
    opts.ABI_CACHE ?? (opts.ABI_CACHE = `./cache/${platform}/abis.json`);
    opts.CONTRACTS ?? (opts.CONTRACTS = []);
    opts.getWeb3 ?? (opts.getWeb3 = (_) => {
        return Web3ClientFactory_1.Web3ClientFactory.get(platform);
    });
    opts.getConfig ?? (opts.getConfig = () => {
        let config = _config_1.$config.get(`blockchainExplorer.${platform}`);
        let mainnet = /(?<mainnet>\w+):/.exec(platform)?.groups?.mainnet;
        if (mainnet != null) {
            let mainnetConfig = _config_1.$config.get(`blockchainExplorer.${mainnet}`);
            config = {
                ...(mainnetConfig ?? {}),
                ...(config ?? {})
            };
        }
        return {
            key: config?.key,
            host: config?.host,
            www: config?.www,
        };
    });
}
class Client {
    async get(url) {
        return this.getInner(url);
    }
    async getHtml(url) {
        let resp = await axios_1.default.get(url);
        if (resp.status !== 200) {
            throw new Error(`${url} not loaded with status ${resp.status}.`);
        }
        return resp.data;
    }
    async getPaged(url) {
        let arr = [];
        let page = 1;
        let size = 200;
        while (true) {
            let path = `${url}&page=${page}&offset=${size}`;
            let pageArr = await this.get(path);
            arr = arr.concat(pageArr);
            if (pageArr.length < size) {
                break;
            }
            page++;
        }
        return arr;
    }
    async getInner(url, opts) {
        let resp = await axios_1.default.get(url);
        let data = resp.data;
        if (data.message === 'NOTOK') {
            let str = data.result;
            if (/Max rate/i.test(str)) {
                let count = opts?.retryCount ?? 3;
                if (--count === 0) {
                    throw new Error(str);
                }
                await _promise_1.$promise.wait(200);
                return this.getInner(url, {
                    retryCount: count
                });
            }
            throw new Error(str);
        }
        if (data.result == null) {
            console.warn(`Blockchain "${url}" explorer returned empty result`, data);
        }
        return data.result;
    }
}
__decorate([
    memd_1.default.deco.queued({ throttle: 1000 / 5 })
], Client.prototype, "get", null);
__decorate([
    memd_1.default.deco.queued({ throttle: 1000 / 5 })
], Client.prototype, "getHtml", null);
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_BlockchainExplorer_BlockChainExplorerFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_BlockchainExplorer_BlockChainExplorerFactory) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_BlockchainExplorer_BlockChainExplorerFactory, module.exports);
    } else {
        _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_arbitrum_Arbiscan;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_arbitrum_Arbiscan != null ? _dequanto_src_chains_arbitrum_Arbiscan : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbiscan = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _config_1 = _dequanto_src_utils__config;
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
const ArbWeb3Client_1 = _dequanto_src_chains_arbitrum_ArbWeb3Client;
const contracts = _config_1.$config.get('contracts.arbitrum', []);
class Arbiscan extends BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
    ABI_CACHE: `./cache/arb/abis.json`,
    CONTRACTS: contracts,
    getWeb3() {
        return a_di_1.default.resolve(ArbWeb3Client_1.ArbWeb3Client);
    },
    getConfig() {
        const config = _config_1.$config.get('blockchainExplorer.arbitrum');
        return {
            key: config?.key,
            host: config?.host,
        };
    }
}) {
}
exports.Arbiscan = Arbiscan;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_arbitrum_Arbiscan === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_arbitrum_Arbiscan) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_arbitrum_Arbiscan, module.exports);
    } else {
        _dequanto_src_chains_arbitrum_Arbiscan = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_BlockchainExplorer_Bscscan;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_BlockchainExplorer_Bscscan != null ? _dequanto_src_BlockchainExplorer_Bscscan : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bscscan = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
const _config_1 = _dequanto_src_utils__config;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const contracts = _config_1.$config.get('contracts.bsc', []);
class Bscscan extends BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
    ABI_CACHE: `./cache/bsc/abis.json`,
    CONTRACTS: contracts,
    getWeb3() {
        return a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client);
    },
    getConfig() {
        const config = _config_1.$config.get('blockchainExplorer.bsc');
        return {
            key: config?.key,
            host: config?.host,
            www: config?.www,
        };
    }
}) {
}
exports.Bscscan = Bscscan;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_BlockchainExplorer_Bscscan === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_BlockchainExplorer_Bscscan) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_BlockchainExplorer_Bscscan, module.exports);
    } else {
        _dequanto_src_BlockchainExplorer_Bscscan = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_BlockchainExplorer_Etherscan;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_BlockchainExplorer_Etherscan != null ? _dequanto_src_BlockchainExplorer_Etherscan : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etherscan = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _config_1 = _dequanto_src_utils__config;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
const contracts = _config_1.$config.get('contracts.eth', []);
class Etherscan extends BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
    ABI_CACHE: `./cache/eth/abis.json`,
    CONTRACTS: contracts,
    getWeb3() {
        return a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client);
    },
    getConfig(platform) {
        platform ?? (platform = 'eth');
        let config = _config_1.$config.get(`blockchainExplorer.${platform}`);
        let mainnet = /(?<mainnet>\w+):/.exec(platform)?.groups?.mainnet;
        if (mainnet != null) {
            let mainnetConfig = _config_1.$config.get(`blockchainExplorer.${mainnet}`);
            config = {
                ...(mainnetConfig ?? {}),
                ...(config ?? {})
            };
        }
        return {
            key: config?.key,
            host: config?.host,
            www: config?.www,
        };
    }
}) {
}
exports.Etherscan = Etherscan;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_BlockchainExplorer_Etherscan === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_BlockchainExplorer_Etherscan) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_BlockchainExplorer_Etherscan, module.exports);
    } else {
        _dequanto_src_BlockchainExplorer_Etherscan = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_BlockchainExplorer_Polyscan;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_BlockchainExplorer_Polyscan != null ? _dequanto_src_BlockchainExplorer_Polyscan : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polyscan = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
const _config_1 = _dequanto_src_utils__config;
const PolyWeb3Client_1 = _dequanto_src_clients_PolyWeb3Client;
const contracts = _config_1.$config.get('contracts.polygon', []);
class Polyscan extends BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
    ABI_CACHE: `./cache/poly/abis.json`,
    CONTRACTS: contracts,
    getWeb3() {
        return a_di_1.default.resolve(PolyWeb3Client_1.PolyWeb3Client);
    },
    getConfig() {
        const config = _config_1.$config.get('blockchainExplorer.polygon');
        return {
            key: config?.key,
            host: config?.host,
            www: config?.www,
        };
    }
}) {
}
exports.Polyscan = Polyscan;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_BlockchainExplorer_Polyscan === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_BlockchainExplorer_Polyscan) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_BlockchainExplorer_Polyscan, module.exports);
    } else {
        _dequanto_src_BlockchainExplorer_Polyscan = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_xdai_XDaiscan;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_xdai_XDaiscan != null ? _dequanto_src_chains_xdai_XDaiscan : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDaiscan = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _config_1 = _dequanto_src_utils__config;
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
const XDaiWeb3Client_1 = _dequanto_src_chains_xdai_XDaiWeb3Client;
const contracts = _config_1.$config.get('contracts.xdai', []);
class XDaiscan extends BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
    ABI_CACHE: `./cache/xdai/abis.json`,
    CONTRACTS: contracts,
    getWeb3() {
        return a_di_1.default.resolve(XDaiWeb3Client_1.XDaiWeb3Client);
    },
    getConfig() {
        const config = _config_1.$config.get('blockchainExplorer.xdai');
        return {
            key: config?.key,
            host: config?.host,
        };
    }
}) {
}
exports.XDaiscan = XDaiscan;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_xdai_XDaiscan === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_xdai_XDaiscan) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_xdai_XDaiscan, module.exports);
    } else {
        _dequanto_src_chains_xdai_XDaiscan = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider != null ? _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChainExplorerProvider = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Arbiscan_1 = _dequanto_src_chains_arbitrum_Arbiscan;
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const Polyscan_1 = _dequanto_src_BlockchainExplorer_Polyscan;
const XDaiscan_1 = _dequanto_src_chains_xdai_XDaiscan;
const _config_1 = _dequanto_src_utils__config;
const BlockChainExplorerFactory_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerFactory;
var BlockChainExplorerProvider;
(function (BlockChainExplorerProvider) {
    function get(platform) {
        switch (platform) {
            case 'bsc':
                return a_di_1.default.resolve(Bscscan_1.Bscscan);
            case 'eth':
                return a_di_1.default.resolve(Etherscan_1.Etherscan);
            case 'polygon':
                return a_di_1.default.resolve(Polyscan_1.Polyscan);
            case 'arbitrum':
                return a_di_1.default.resolve(Arbiscan_1.Arbiscan);
            case 'xdai':
                return a_di_1.default.resolve(XDaiscan_1.XDaiscan);
            case 'hardhat':
                return null;
            default:
                let cfg = _config_1.$config.get(`blockchainExplorer.${platform}`);
                if (cfg != null) {
                    return createScanApiClient(platform);
                }
                throw new Error(`Unsupported platform ${platform} for block chain explorer`);
        }
    }
    BlockChainExplorerProvider.get = get;
})(BlockChainExplorerProvider = exports.BlockChainExplorerProvider || (exports.BlockChainExplorerProvider = {}));
function createScanApiClient(platform) {
    let ClientConstructor = BlockChainExplorerFactory_1.BlockChainExplorerFactory.create({
        platform,
    });
    return new ClientConstructor();
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_BlockchainExplorer_BlockChainExplorerProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_BlockchainExplorer_BlockChainExplorerProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_BlockchainExplorer_BlockChainExplorerProvider, module.exports);
    } else {
        _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_gen_Generator;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_gen_Generator != null ? _dequanto_src_gen_Generator : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const _address_1 = _dequanto_src_utils__address;
const _require_1 = _dequanto_src_utils__require;
const GeneratorFromAbi_1 = _dequanto_src_gen_GeneratorFromAbi;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const BlockChainExplorerProvider_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider;
const _path_1 = _dequanto_src_utils__path;
const _logger_1 = _dequanto_src_utils__logger;
const KEYS = {
    'platform': 1,
    'name': 1,
    'defaultAddress': 1,
    'source.abi': 1,
    'source.code': 1,
    'output': 1,
    'implementation': 1
};
class Generator {
    constructor(options) {
        this.options = options;
        let { platform, } = options;
        this.explorer = BlockChainExplorerProvider_1.BlockChainExplorerProvider.get(platform);
        if (options.defaultAddress == null && _address_1.$address.isValid(options.source.abi)) {
            options.defaultAddress = options.source.abi;
        }
    }
    static async generateForClass(path) {
        let i = path.indexOf('*');
        if (i > -1) {
            let base = path.substring(0, i).replace(/\\/g, '/');
            let glob = path.substring(i).replace(/\\/g, '/');
            let files = await atma_io_1.Directory.readFilesAsync(base, glob);
            await (0, alot_1.default)(files)
                .forEachAsync(async (file) => {
                await this.generateForClass(file.uri.toString());
            })
                .toArrayAsync({ threads: 1 });
            return;
        }
        let jsCode = await atma_io_1.File.readAsync(path, { skipHooks: true });
        let startIdx = jsCode.indexOf('/*');
        let endIdx = jsCode.indexOf('*/');
        if (startIdx === -1 || endIdx === -1) {
            throw new Error(`${path} should contain dequanto options in comment`);
        }
        let header = jsCode.substring(startIdx, endIdx);
        let lines = header.split('\n');
        let rgxOpts = /(?<key>[\w.]+)\s*:\s*(?<value>[^\n]+)/;
        let options = {};
        for (let line of lines) {
            let match = rgxOpts.exec(line);
            if (match == null) {
                continue;
            }
            let key = match.groups.key.trim();
            let value = match.groups.value.trim();
            if (value === 'true') {
                value = true;
            }
            else if (value === 'false') {
                value = false;
            }
            else if (/^[\d\.]$/.test(value)) {
                value = Number(value);
            }
            if (key in KEYS === false) {
                throw new Error(`Invalid options key ${key}`);
            }
            (0, atma_utils_1.obj_setProperty)(options, key, value);
        }
        // make Contracts in dequanto package relative to dequanto root
        let rgxRoot = /[\\\/]dequanto[\\\/].+/;
        if (rgxRoot.test(path)) {
            let root = path.replace(rgxRoot, '/dequanto/');
            options.output = atma_utils_1.class_Uri.combine(root, options.output);
        }
        let generator = new Generator({
            ...options,
            location: new atma_utils_1.class_Uri(path).toDir().toString()
        });
        await generator.generate();
    }
    async generate() {
        let { name, platform: network, output, implementation: implSource } = this.options;
        let { abiJson, implementation } = await this.getAbi({ implementation: implSource });
        let sources = await this.getSources(implementation, name);
        let generator = a_di_1.default.resolve(GeneratorFromAbi_1.GeneratorFromAbi);
        let address = this.options.defaultAddress;
        return await generator.generate(abiJson, {
            network: network,
            name: name,
            address: address,
            output: output,
            implementation: implementation,
            sources: sources,
            saveAbi: this.options.saveAbi
        });
    }
    async getAbi(opts) {
        let abi = this.options.source.abi;
        _require_1.$require.notNull(abi, `Abi not provided to get the Abi Json from`);
        let abiJson;
        let implementation;
        if (abi.startsWith('0x')) {
            let { abi, implementation: impl } = await this.getAbiByAddress(opts);
            abiJson = abi;
            implementation = impl;
        }
        else {
            let path = abi;
            let location = this.options.location;
            if (location && _path_1.$path.isAbsolute(path) === false) {
                // if path not relative, check the file at ClassFile location
                let relPath = atma_utils_1.class_Uri.combine(location, path);
                if (await atma_io_1.File.existsAsync(relPath)) {
                    path = relPath;
                }
            }
            let json = await atma_io_1.File.readAsync(path);
            abiJson = Array.isArray(json) ? json : json.abi;
        }
        _require_1.$require.notNull(abiJson, `Abi not resolved from ${abi}`);
        return { abiJson, implementation };
    }
    async getSources(implementation, name) {
        if (_address_1.$address.isValid(implementation) === false) {
            return null;
        }
        _logger_1.$logger.log('Loading contract source code.');
        let meta = await this.explorer.getContractSource(implementation);
        if (meta?.SourceCode == null) {
            _logger_1.$logger.log('No contract source found.');
            return null;
        }
        if (/^\s*\{/.test(meta.SourceCode) === false) {
            _logger_1.$logger.log('Source contract as single file fetched.');
            return {
                [`${name}.sol`]: {
                    content: meta.SourceCode
                }
            };
        }
        let code = meta
            .SourceCode
            .replace(/\{\{/g, '{')
            .replace(/\}\}/g, '}');
        try {
            let sources = JSON.parse(code);
            let files = sources.sources;
            _logger_1.$logger.log(`Source code (${Object.keys(files).join(', ')}) fetched.`);
            return files;
        }
        catch (error) {
            _logger_1.$logger.error(`Source code can't be parsed: `, code);
            throw new Error(`Source code can't be parsed: ${error.message}`);
        }
    }
    async getAbiByAddress(opts) {
        let address = _address_1.$address.expectValid(this.options.source?.abi, 'contract address is not valid');
        let explorer = _require_1.$require.notNull(this.explorer, `Explorer not resolved for network: ${this.options.platform}`);
        try {
            _logger_1.$logger.log(`Loading contracts ABI for ${address}. `);
            let { abi, implementation } = await explorer.getContractAbi(address, opts);
            let hasProxy = _address_1.$address.eq(address, implementation) === false;
            _logger_1.$logger.log(`Proxy detected: ${hasProxy ? 'YES' : 'NO'}`, hasProxy ? implementation : '');
            let abiJson = JSON.parse(abi);
            return { abi: abiJson, implementation };
        }
        catch (error) {
            _logger_1.$logger.error(error);
            throw new Error(`ABI is not resolved from ${this.options.platform}/${address}: ${error.message ?? error}`);
        }
    }
}
exports.Generator = Generator;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_gen_Generator === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_gen_Generator) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_gen_Generator, module.exports);
    } else {
        _dequanto_src_gen_Generator = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CInstall;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CInstall != null ? _src_commands_list_CInstall : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CInstall = void 0;
const Generator_1 = _dequanto_src_gen_Generator;
const _require_1 = _dequanto_src_utils__require;
const _validate_1 = _src_utils__validate;
const atma_utils_1 = require("atma-utils");
const atma_io_1 = require("atma-io");
exports.CInstall = {
    command: 'i, install',
    description: [
        `Download contracts ABI and generate the TS class for it.`,
        `Supported chains: ${_validate_1.$validate.platforms.join(', ')}`,
    ],
    arguments: [
        {
            description: 'Contract address or path',
            required: true
        }
    ],
    params: {
        '-n, --name': {
            description: 'The class name.',
            required: true
        },
        '-p, --proxy-target': {
            description: 'We can detect proxies by standart proxy implementations, in some edge cases you can set the implementation address manually.'
        },
        '-c, --chain': {
            description: 'Set chain ID or Symbol. Can be used also via address prefix, e.g. eth:0x..'
        },
        '-o, --output': {
            description: 'Output directory. Default: ./0xweb/'
        }
    },
    async process(args, params) {
        let platform = params.chain;
        let [address] = args;
        if (/^\w+:0x/.test(address)) {
            let i = address.indexOf(':');
            platform = address.substring(0, i);
            address = address.substring(i + 1);
        }
        _require_1.$require.notNull(params.name, `--name should be set`);
        _validate_1.$validate.platform(platform, `Chain not set. Use as prefix "eth:0x.." or flag "--chain eth"`);
        _validate_1.$validate.config.blockchainExplorer(platform);
        let output = atma_utils_1.class_Uri.combine(params.output ?? `./0xweb/`, platform);
        let generator = new Generator_1.Generator({
            name: params.name,
            platform,
            source: {
                abi: address
            },
            implementation: params.proxyTarget,
            output,
            saveAbi: true
        });
        let { main } = await generator.generate();
        let packagePath = `0xweb.json`;
        let json = {};
        if (await atma_io_1.File.existsAsync(packagePath)) {
            json = await atma_io_1.File.readAsync(packagePath);
        }
        if (json.contracts == null) {
            json.contracts = {};
        }
        if (json.contracts[platform] == null) {
            json.contracts[platform] = {};
        }
        json.contracts[platform][address] = {
            name: params.name,
            main
        };
        await atma_io_1.File.writeAsync(packagePath, json);
        return { main };
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CInstall === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CInstall) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CInstall, module.exports);
    } else {
        _src_commands_list_CInstall = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CConfig;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CConfig != null ? _src_commands_list_CConfig : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CConfig = void 0;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const _console_1 = _src_utils__console;
const _promise_1 = _dequanto_src_utils__promise;
exports.CConfig = {
    command: 'config',
    description: [
        'View and edit web3 configuration'
    ],
    params: {
        '-v, --view': {
            description: 'Print current configuration. ',
        },
        '-e, --edit': {
            description: 'Open/create the configuration file in AppData to edit',
        }
    },
    async process(args, params, app) {
        if (params.edit) {
            atma_io_1.File.registerExtensions({
                'yml': [
                    "atma-io-middleware-yml:read",
                    "atma-io-middleware-yml:write"
                ]
            }, false);
            let path = atma_io_1.env.appdataDir.combine('.dequanto/config.yml').toString();
            if (await atma_io_1.File.existsAsync(path) === false) {
                let json = getJson();
                _console_1.$console.log(`Create bold<${path}>`);
                await atma_io_1.File.writeAsync(path, json);
            }
            let sysPath = new atma_utils_1.class_Uri(path).toLocalFile();
            _console_1.$console.log(`Open cyan<bold<file://${sysPath}>>`);
            Os.open(sysPath);
            await _promise_1.$promise.wait(500);
            return;
        }
        if (true || params.view) {
            _console_1.$console.log('Current configuration:');
            console.dir(JSON.parse(JSON.stringify(getJson())), { depth: null });
            return;
        }
        function getJson() {
            let json = app.config.toJSON();
            delete json.e;
            delete json.edit;
            delete json.v;
            delete json.view;
            return json;
        }
    }
};
var Os;
(function (Os) {
    function open(filePath) {
        const { exec } = require('child_process');
        let command = (function () {
            switch (process.platform) {
                case 'darwin': {
                    return 'open ' + filePath + ' && lsof -p $! +r 1 &>/dev/null';
                }
                case 'win32': {
                    return 'start /wait ' + filePath;
                }
                default: {
                    return 'xdg-open ' + filePath + ' && tail --pid=$! -f /dev/null';
                }
            }
        })();
        let child = exec(command);
    }
    Os.open = open;
})(Os || (Os = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CConfig === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CConfig) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CConfig, module.exports);
    } else {
        _src_commands_list_CConfig = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__crypto;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__crypto != null ? _dequanto_src_utils__crypto : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$crypto = void 0;
class WebCrypto {
    constructor() {
        this.crypto = crypto;
    }
    randomBytes(size) {
        let array = new Uint8Array(size);
        let rnd = this.crypto.getRandomValues(array);
        return rnd;
    }
}
class WebCryptoPolyfill {
    constructor() {
        this.crypto = require('crypto');
    }
    randomBytes(size) {
        const bytes = this.crypto.randomBytes(size);
        return bytes;
    }
}
exports.$crypto = typeof crypto === "undefined"
    ? new WebCryptoPolyfill()
    : new WebCrypto();
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__crypto === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__crypto) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__crypto, module.exports);
    } else {
        _dequanto_src_utils__crypto = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__buffer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__buffer != null ? _dequanto_src_utils__buffer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$buffer = void 0;
const atma_utils_1 = require("atma-utils");
class NodeBufferUtils {
    fromString(str, encoding) {
        return Buffer.from(str, encoding ?? 'utf8');
    }
    toString(buffer, encoding) {
        return buffer.toString(encoding);
    }
    fromHex(hex) {
        return Buffer.from(utils.normalizeHex(hex), 'hex');
    }
    toHex(buffer) {
        return '0x' + buffer.toString('hex');
    }
    concat(buffers) {
        return Buffer.concat(buffers);
    }
}
const HEX_CHARS = "0123456789abcdef";
const HEX_DIGITS = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15
};
class WebBufferUtils {
    fromString(string, encoding) {
        if (encoding != null && /utf\-?8/.test(encoding) === false) {
            throw new Error(`Only UTF8 Encoding supported`);
        }
        return new TextEncoder().encode(string);
    }
    toString(buffer, encoding) {
        if (encoding != null && /utf\-?8/.test(encoding) === false) {
            throw new Error(`Only UTF8 Encoding supported`);
        }
        return new TextDecoder().decode(buffer);
    }
    fromHex(hex) {
        hex = utils.normalizeHex(hex);
        let bytes = new Uint8Array(Math.floor(hex.length / 2));
        let i = 0;
        for (; i < bytes.length; i++) {
            const a = HEX_DIGITS[hex[i * 2]];
            const b = HEX_DIGITS[hex[i * 2 + 1]];
            if (a == null || b == null) {
                break;
            }
            bytes[i] = (a << 4) | b;
        }
        return i === bytes.length
            ? bytes
            : bytes.slice(0, i);
    }
    toHex(buffer) {
        let hex = '';
        for (let i = 0; i < buffer.length; i++) {
            let b = buffer[i];
            hex += HEX_CHARS[b >> 4] + HEX_CHARS[b & 15];
        }
        return '0x' + hex;
    }
    concat(buffers) {
        let size = buffers.reduce((a, x) => a + x.length, 0);
        let buffer = new Uint8Array(size);
        let offset = 0;
        for (let i = 0; i < buffers.length; i++) {
            let buf = buffers[i];
            buffer.set(buf, offset);
            offset += buf.length;
        }
        return buffer;
    }
}
var utils;
(function (utils) {
    function normalizeHex(hex) {
        if (hex.startsWith('0x')) {
            hex = hex.substring(2);
        }
        if (hex.length % 2 !== 0) {
            throw new Error(`Not valid hex buffer. Char count not even: ${hex}`);
        }
        if (/^[\da-f]+$/i.test(hex) === false) {
            throw new Error(`Not valid hex buffer. Invalid char in ${hex}`);
        }
        return hex;
    }
    utils.normalizeHex = normalizeHex;
})(utils || (utils = {}));
exports.$buffer = atma_utils_1.is_NODE
    ? new NodeBufferUtils()
    : new WebBufferUtils();
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__buffer === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__buffer) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__buffer, module.exports);
    } else {
        _dequanto_src_utils__buffer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_ChainAccountProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_ChainAccountProvider != null ? _dequanto_src_ChainAccountProvider : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainAccountProvider = void 0;
const memd_1 = __importDefault(require("memd"));
const _config_1 = _dequanto_src_utils__config;
const ethers_1 = require("ethers");
const _address_1 = _dequanto_src_utils__address;
const _crypto_1 = _dequanto_src_utils__crypto;
const _buffer_1 = _dequanto_src_utils__buffer;
var ChainAccountProvider;
(function (ChainAccountProvider) {
    function get(platform, name) {
        let accounts = AccountsConfigProvider.get();
        let acc = accounts?.[platform]?.[name];
        if (acc == null) {
            throw new Error(`Account not resolved by name: ${name} in ${platform}`);
        }
        acc.name = name;
        acc.platform = platform;
        return acc;
    }
    ChainAccountProvider.get = get;
    function tryGet(mix, platform) {
        let all = this.getAll();
        let accounts = all.filter(x => (_address_1.$address.eq(mix, x.address) || x.name == mix));
        if (accounts.length === 0) {
            return null;
        }
        let acc = accounts[0];
        return {
            ...acc,
            platform: platform ?? acc.platform
        };
    }
    ChainAccountProvider.tryGet = tryGet;
    function getAll() {
        return AccountsConfigProvider.get();
    }
    ChainAccountProvider.getAll = getAll;
    function getAddressFromKey(key) {
        const bytes = _buffer_1.$buffer.fromHex(key);
        const wallet = new ethers_1.Wallet(bytes);
        return wallet.address;
    }
    ChainAccountProvider.getAddressFromKey = getAddressFromKey;
    function generate(opts) {
        const bytes = _crypto_1.$crypto.randomBytes(32);
        const wallet = new ethers_1.Wallet(bytes);
        return {
            ...(opts ?? {}),
            address: wallet.address,
            key: wallet.privateKey,
        };
    }
    ChainAccountProvider.generate = generate;
    class AccountsConfigProvider {
        static get() {
            let accounts = _config_1.$config.get('accounts');
            if (accounts == null) {
                return [];
            }
            if (Array.isArray(accounts)) {
                return accounts;
            }
            let out = [];
            for (let platform in accounts) {
                for (let name in accounts[platform]) {
                    let account = accounts[platform][name];
                    account.name = name;
                    account.platform = platform;
                    out.push(account);
                }
            }
            return out;
        }
    }
    __decorate([
        memd_1.default.deco.memoize()
    ], AccountsConfigProvider, "get", null);
})(ChainAccountProvider = exports.ChainAccountProvider || (exports.ChainAccountProvider = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_ChainAccountProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_ChainAccountProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_ChainAccountProvider, module.exports);
    } else {
        _dequanto_src_ChainAccountProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_services_AccountsService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_services_AccountsService != null ? _src_services_AccountsService : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const _console_1 = _src_utils__console;
const ChainAccountProvider_1 = _dequanto_src_ChainAccountProvider;
const _is_1 = _dequanto_src_utils__is;
class AccountsService {
    constructor(config) {
        this.config = config;
    }
    async add(params) {
        let accounts = this.getAccounts();
        if (accounts.find(x => x.name === params.name)) {
            console.warn(`Account ${params.name} already exists`);
        }
        else {
            accounts.push(params);
            await this.save(accounts);
        }
        return accounts;
    }
    async remove(name) {
        let accounts = this.getAccounts();
        let index = accounts.findIndex(x => x.name === name);
        if (index === -1) {
            console.warn(`Account ${name} not found`);
        }
        else {
            accounts.splice(index, 1);
            await this.save(accounts);
        }
        return accounts;
    }
    async list() {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }
    async get(mix) {
        if (_is_1.$is.hexString(mix) && mix.length > 64) {
            return {
                address: ChainAccountProvider_1.ChainAccountProvider.getAddressFromKey(mix),
                key: mix
            };
        }
        let name = mix;
        let accounts = await this.list();
        let account = this.getAccount(name);
        if (account == null) {
            _console_1.$console.log('Available accounts:');
            _console_1.$console.log(accounts.map(x => x.name).join('\n'));
            throw new Error(`Account ${name} not found.`);
        }
        return account;
    }
    async create(name) {
        let current = await this.getAccount(name);
        if (current != null) {
            _console_1.$console.log(`Account green<bold<${name}>> already exists`);
            return null;
        }
        let account = await ChainAccountProvider_1.ChainAccountProvider.generate({ name, platform: 'eth' });
        await this.add(account);
        return account;
    }
    getAccounts() {
        let source = this.getConfig();
        let accounts = source.config?.accounts ?? [];
        return accounts;
    }
    getConfig() {
        let source = this.config.$sources.array.find(x => x.data.name === 'accounts');
        if (source == null) {
            throw new Error(`Configuration source for accounts not found`);
        }
        if (source.config == null) {
            source.config = {};
        }
        return source;
    }
    async getAccount(name) {
        let accounts = await this.list();
        let account = accounts.find(x => x.name === name);
        return account;
    }
    async save(accounts) {
        let source = this.getConfig();
        await source.write({ accounts }, false);
    }
}
exports.AccountsService = AccountsService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_services_AccountsService === module.exports) {
        // do nothing if
    } else if (__isObj(_src_services_AccountsService) && __isObj(module.exports)) {
        Object.assign(_src_services_AccountsService, module.exports);
    } else {
        _src_services_AccountsService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_Paramsters;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_Paramsters != null ? _src_utils_Paramsters : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = void 0;
const _validate_1 = _src_utils__validate;
exports.Parameters = {
    account(opts) {
        return {
            '-a, --account': {
                description: 'Account name. Accounts should be unlocked with gray<-p, --pin> parameter',
                required: opts?.required ?? true,
            }
        };
    },
    pin: {
        '-p, --pin': {
            description: 'Account configuration is encrypted with a derived key from the pin and local machine key. ',
            required: true
        },
    },
    chain: {
        '-c, --chain': {
            description: `Available chains: ${_validate_1.$validate.platforms.join(', ')}`,
            required: true,
            oneOf: _validate_1.$validate.platforms
        }
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_Paramsters === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_Paramsters) && __isObj(module.exports)) {
        Object.assign(_src_utils_Paramsters, module.exports);
    } else {
        _src_utils_Paramsters = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CAccounts;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CAccounts != null ? _src_commands_list_CAccounts : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAccounts = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const AccountsService_1 = _src_services_AccountsService;
const ChainAccountProvider_1 = _dequanto_src_ChainAccountProvider;
const _address_1 = _dequanto_src_utils__address;
const _console_1 = _src_utils__console;
const Paramsters_1 = _src_utils_Paramsters;
exports.CAccounts = {
    command: 'accounts',
    description: [
        'Manage accounts.'
    ],
    subcommands: [
        {
            command: 'add',
            description: [
                'Add existing account'
            ],
            params: {
                '-k, --key': {
                    description: 'Private key. Optional for READs, required if WRITE actions.',
                },
                '-a, --address': {
                    description: 'Address. Optional, if key is also set',
                },
                '-n, --name': {
                    description: 'Name of the account',
                    required: true,
                },
            },
            async process(args, params, app) {
                let { key, address, name } = params;
                if (key == null && address == null) {
                    throw new Error(`Provide key("-k 0xabcd") or address ("-a 0x1234")`);
                }
                if (key) {
                    let addr = ChainAccountProvider_1.ChainAccountProvider.getAddressFromKey(key);
                    if (address != null && _address_1.$address.eq(addr, address) === false) {
                        throw new Error(`Provided key resolves to ${addr} address, but ${address} was provided.`);
                    }
                    address = addr;
                }
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let accounts = await service.add({ key, address, name });
                let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');
                _console_1.$console.log(`Accounts:`);
                _console_1.$console.log(str);
            }
        },
        {
            command: 'remove',
            description: [
                'Remove account'
            ],
            params: {
                '-n, --name': {
                    description: 'Name of the account to remove',
                    required: true,
                },
            },
            async process(args, params, app) {
                let { name } = params;
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let accounts = await service.remove(name);
                let str = accounts.length > 0
                    ? accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n')
                    : `   No account added`;
                _console_1.$console.log(`Accounts:`);
                _console_1.$console.log(str);
                _console_1.$console.log('');
            }
        },
        {
            command: 'list',
            description: [
                'List account names'
            ],
            async process(args, params, app) {
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let accounts = await service.list();
                if (accounts.length === 0) {
                    console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                    return;
                }
                let str = accounts.map(x => ` - ${x.name} [${x.address}]`).join('\n');
                _console_1.$console.log(str);
            }
        },
        {
            command: 'new',
            description: [
                'Create new account'
            ],
            params: {
                '-n, --name': {
                    description: 'Name of the account to create',
                    required: true,
                },
            },
            async process(args, params, app) {
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let account = await service.create(params.name);
                if (account == null) {
                    return;
                }
                _console_1.$console.log(`yellow<You must backup the key bold<!!!>>`);
                _console_1.$console.table([
                    ['Name', account.name],
                    ['Address', account.address],
                    ['Key', account.key],
                ]);
            }
        }
    ],
    params: {
        ...Paramsters_1.Parameters.pin,
    },
    async process(args, params, app) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CAccounts === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CAccounts) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CAccounts, module.exports);
    } else {
        _src_commands_list_CAccounts = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CBlock;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CBlock != null ? _src_commands_list_CBlock : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CBlock = void 0;
const _validate_1 = _src_utils__validate;
const _require_1 = _dequanto_src_utils__require;
const _date_1 = _dequanto_src_utils__date;
const _block_1 = _dequanto_src_utils__block;
const _console_1 = _src_utils__console;
exports.CBlock = {
    command: 'block',
    description: [
        'Block utils'
    ],
    subcommands: [
        {
            command: 'get',
            description: [
                'Get block info'
            ],
            arguments: [
                { description: `latest or <blockNumber>` }
            ],
            params: {
                '-c, --chain': {
                    description: `Default: eth. Available: ${_validate_1.$validate.platforms.join(', ')}`
                },
            },
            async process(args, params, app) {
                let [blockNr] = args;
                if (blockNr === 'latest') {
                    _console_1.$console.toast('Getting latest block number...');
                    let nr = await app.chain.client.getBlockNumber();
                    blockNr = String(nr);
                }
                let nr = Number(blockNr);
                _require_1.$require.Number(nr, 'BlockNumber is not a number');
                _console_1.$console.toast(`Loading block bold<${nr}>`);
                let block = await app.chain.client.getBlock(nr);
                _console_1.$console.table([
                    ['Block', nr],
                    ['Hash', block.hash],
                    ['Parent', block.parentHash],
                    ['Miner', block.miner],
                    ['Time', _date_1.$date.format(_block_1.$block.getDate(block), 'dd-MM-yyyy HH:mm:ss')],
                    ['Transactions', block.transactions.length],
                ]);
                let hashes = block.transactions.map((tx, i) => {
                    return [`#${i + 1}`, tx];
                });
                _console_1.$console.table([
                    ...hashes
                ]);
            }
        },
    ],
    params: {},
    async process(args, params, app) {
        console.warn(`A sub-command for "block" not found: ${args[0]}. Call "0xweb block --help" to view the list of commands`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CBlock === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CBlock) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CBlock, module.exports);
    } else {
        _src_commands_list_CBlock = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_class_json_lib_class_json;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_class_json_lib_class_json != null ? _node_modules_class_json_lib_class_json : {};
    var module = { exports: exports };

    
// source ./UMD.js
(function (factory) {

    var _name = 'class-json',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
        return;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _src_Json = {};
var _src_JsonConvert = {};
var _src_JsonDeserializer = {};
var _src_JsonSchema = {};
var _src_JsonSerializer = {};
var _src_JsonSettings = {};
var _src_JsonUtils = {};
var _src_JsonValidate = {};
var _src_Serializable = {};
var _src_Types = {};
var _src_utils_is = {};
var _src_utils_obj = {};
var _src_validation_Rule = {};
var _src_validation_RuleBase = {};
var _src_validation_rules_Custom = {};
var _src_validation_rules_Length = {};
var _src_validation_rules_Number = {};
var _src_validation_rules_Pattern = {};
var _src_validation_rules_Required = {};
var _src_validation_rules_String = {};

// source ./ModuleSimplified.js
var _src_utils_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
function obj_clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    if (Array.isArray(source)) {
        var arr = source;
        var out = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            out[i] = obj_clone(arr[i]);
        }
        return out;
    }
    var Ctor = source.constructor;
    if (Ctor === Object) {
        var obj = {};
        for (var key in source) {
            obj[key] = obj_clone(source[key]);
        }
        return obj;
    }
    return source;
}
exports.obj_clone = obj_clone;
function obj_getKeys(x) {
    var keys = [];
    var proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push.apply(keys, Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return keys;
}
exports.obj_getKeys = obj_getKeys;
function obj_getProperty(obj_, path) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
    while (obj != null && ++i < imax) {
        var key = chain[i];
        obj = obj[key];
    }
    return obj;
}
exports.obj_getProperty = obj_getProperty;
;
function keysToObj(keys) {
    if (keys == null) {
        return null;
    }
    var obj = Object.create(null);
    for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = 1;
    }
    return obj;
}
function obj_map(source, mapper) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (source == null || typeof source !== 'object') {
        return source;
    }
    if (Array.isArray(source)) {
        return source.map(function (x) { return obj_map(x, mapper); });
    }
    var out = Object.create(null);
    var excludeProps = keysToObj((_a = mapper) === null || _a === void 0 ? void 0 : _a.exclude);
    var includeProps = keysToObj((_b = mapper) === null || _b === void 0 ? void 0 : _b.include);
    for (var key in source) {
        var val = source[key];
        if (val == null) {
            continue;
        }
        if (excludeProps != null && key in excludeProps === true) {
            continue;
        }
        if (includeProps != null && key in includeProps !== true) {
            continue;
        }
        var info = (_d = (_c = mapper) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d[key];
        if ((_e = info) === null || _e === void 0 ? void 0 : _e.ignore) {
            continue;
        }
        var name = (_g = (_f = info) === null || _f === void 0 ? void 0 : _f.name, (_g !== null && _g !== void 0 ? _g : key));
        if ((_h = info) === null || _h === void 0 ? void 0 : _h.map) {
            out[name] = (_j = info) === null || _j === void 0 ? void 0 : _j.map(val);
            continue;
        }
        if (typeof val === 'object' && info != null && (info.exclude || info.include || info.props)) {
            val = obj_map(val, info);
        }
        out[name] = val;
    }
    return out;
}
exports.obj_map = obj_map;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=obj.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_obj) && isObject(module.exports)) {
		Object.assign(_src_utils_obj, module.exports);
		return;
	}
	_src_utils_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var obj_1 = _src_utils_obj;
var JsonUtils;
(function (JsonUtils) {
    JsonUtils.META_KEY = '__json__';
    function resolveModelMeta(mix) {
        if (mix == null) {
            return null;
        }
        var target = typeof mix === 'function' ? mix.prototype : mix;
        var meta = target[JsonUtils.META_KEY];
        if (meta != null) {
            if (target.hasOwnProperty(JsonUtils.META_KEY) === false) {
                // was inherited
                meta = obj_1.obj_clone(meta);
                meta.Type = mix;
                Object.defineProperty(target, JsonUtils.META_KEY, {
                    enumerable: false,
                    configurable: true,
                    value: meta
                });
            }
        }
        if (meta == null) {
            meta = {
                Type: typeof mix === 'function' ? mix : mix.constructor,
                properties: {}
            };
            Object.defineProperty(target, JsonUtils.META_KEY, {
                enumerable: false,
                configurable: true,
                value: meta
            });
        }
        return meta;
    }
    JsonUtils.resolveModelMeta = resolveModelMeta;
    function pickModelMeta(mix) {
        if (mix == null) {
            return null;
        }
        var isFn = typeof mix === 'function';
        if (isFn && mix === Object) {
            return null;
        }
        if (isFn) {
            return mix.prototype[JsonUtils.META_KEY] || null;
        }
        return mix[JsonUtils.META_KEY] || null;
    }
    JsonUtils.pickModelMeta = pickModelMeta;
    function hasModelMeta(mix) {
        return pickModelMeta(mix) != null;
    }
    JsonUtils.hasModelMeta = hasModelMeta;
    function pickPropertyMeta(target, propertyKey) {
        var _a;
        var meta = pickModelMeta(target);
        return (_a = meta) === null || _a === void 0 ? void 0 : _a.properties[propertyKey];
    }
    JsonUtils.pickPropertyMeta = pickPropertyMeta;
    function resolvePropertyMeta(target, propertyKey) {
        var meta = resolveModelMeta(target);
        var propertyInfo = meta.properties[propertyKey];
        if (propertyInfo == null) {
            propertyInfo = meta.properties[propertyKey] = {
                property: propertyKey,
                rules: null
            };
        }
        return propertyInfo;
    }
    JsonUtils.resolvePropertyMeta = resolvePropertyMeta;
    function pickPropertyRules(target, propertyKey) {
        var _a;
        var propInfo = pickPropertyMeta(target, propertyKey);
        return (_a = propInfo) === null || _a === void 0 ? void 0 : _a.rules;
    }
    JsonUtils.pickPropertyRules = pickPropertyRules;
    function resolvePropertyRules(target, propertyKey) {
        var _a;
        var propInfo = resolvePropertyMeta(target, propertyKey);
        return _a = propInfo.rules, (_a !== null && _a !== void 0 ? _a : (propInfo.rules = []));
    }
    JsonUtils.resolvePropertyRules = resolvePropertyRules;
    JsonUtils.map = obj_1.obj_map;
})(JsonUtils = exports.JsonUtils || (exports.JsonUtils = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonUtils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonUtils) && isObject(module.exports)) {
		Object.assign(_src_JsonUtils, module.exports);
		return;
	}
	_src_JsonUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_RuleBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var obj_1 = _src_utils_obj;
var RuleBase = /** @class */ (function () {
    function RuleBase(property, mix) {
        this.property = property;
        if (mix != null) {
            this.opts = typeof mix === 'string' ? { message: mix } : mix;
        }
    }
    RuleBase.prototype.formatMessage = function (value, root, $default) {
        var _a;
        var msg = (_a = this.opts) === null || _a === void 0 ? void 0 : _a.message;
        if (msg == null) {
            return $default;
        }
        if (typeof msg === 'function') {
            return msg(this.property, value, root);
        }
        if (msg.includes('~[') === false) {
            return msg;
        }
        var model = { property: this.property, value: value, model: root };
        return msg.replace(/~\[([^\]]+)]/g, function (_, acc) {
            return obj_1.obj_getProperty(model, acc.trim());
        });
    };
    return RuleBase;
}());
exports.RuleBase = RuleBase;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=RuleBase.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_RuleBase) && isObject(module.exports)) {
		Object.assign(_src_validation_RuleBase, module.exports);
		return;
	}
	_src_validation_RuleBase = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Required;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    function Required() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Required.prototype.validate = function (value, root) {
        if (value == null) {
            return {
                name: 'Required',
                property: this.property,
                value: null,
                message: this.formatMessage(null, root, this.property + " is not set")
            };
        }
    };
    return Required;
}(RuleBase_1.RuleBase));
exports.Required = Required;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Required.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Required) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Required, module.exports);
		return;
	}
	_src_validation_rules_Required = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Length;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var MinLength = /** @class */ (function (_super) {
    __extends(MinLength, _super);
    function MinLength(prop, count, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.count = count;
        return _this;
    }
    MinLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MinLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (value.length < this.count) {
            return {
                name: 'MinLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be mininum of length " + this.count + ", but got " + value.length)
            };
        }
    };
    return MinLength;
}(RuleBase_1.RuleBase));
exports.MinLength = MinLength;
var MaxLength = /** @class */ (function (_super) {
    __extends(MaxLength, _super);
    function MaxLength(prop, count, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.count = count;
        return _this;
    }
    MaxLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MaxLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (value.length > this.count) {
            return {
                name: 'MaxLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be maximum of length " + this.count + ", but got " + value.length)
            };
        }
    };
    return MaxLength;
}(RuleBase_1.RuleBase));
exports.MaxLength = MaxLength;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Length.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Length) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Length, module.exports);
		return;
	}
	_src_validation_rules_Length = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Pattern;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern(prop, pattern, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.pattern = pattern;
        return _this;
    }
    Pattern.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'Pattern.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (this.pattern.test(value) === false) {
            return {
                name: 'Pattern',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must match the pattern " + String(this.pattern))
            };
        }
    };
    return Pattern;
}(RuleBase_1.RuleBase));
exports.Pattern = Pattern;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Pattern.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Pattern) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Pattern, module.exports);
		return;
	}
	_src_validation_rules_Pattern = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Custom;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(prop, fn, name) {
        if (name === void 0) { name = 'Custom'; }
        var _this = _super.call(this, prop) || this;
        _this.fn = fn;
        _this.name = name;
        return _this;
    }
    Custom.prototype.validate = function (value, root) {
        var message = this.fn(value, root);
        if (message != null) {
            return {
                name: this.name,
                property: this.property,
                value: value,
                message: message
            };
        }
    };
    return Custom;
}(RuleBase_1.RuleBase));
exports.Custom = Custom;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Custom.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Custom) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Custom, module.exports);
		return;
	}
	_src_validation_rules_Custom = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Number;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Minimum = /** @class */ (function (_super) {
    __extends(Minimum, _super);
    function Minimum(prop, value, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.value = value;
        return _this;
    }
    Minimum.prototype.validate = function (value, root) {
        if (typeof value !== 'number') {
            return {
                name: 'Minimum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a number, but got " + typeof value)
            };
        }
        if (value < this.value) {
            return {
                name: 'Minimum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be mininum " + this.value + ", but got " + value)
            };
        }
    };
    return Minimum;
}(RuleBase_1.RuleBase));
exports.Minimum = Minimum;
var Maximum = /** @class */ (function (_super) {
    __extends(Maximum, _super);
    function Maximum(prop, value, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.value = value;
        return _this;
    }
    Maximum.prototype.validate = function (value, root) {
        if (typeof value !== 'number') {
            return {
                name: 'Maximum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a number, but got " + typeof value)
            };
        }
        if (value > this.value) {
            return {
                name: 'Maximum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be maximum " + this.value + ", but got " + value)
            };
        }
    };
    return Maximum;
}(RuleBase_1.RuleBase));
exports.Maximum = Maximum;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Number.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Number) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Number, module.exports);
		return;
	}
	_src_validation_rules_Number = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_String;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var StringEnum = /** @class */ (function (_super) {
    __extends(StringEnum, _super);
    function StringEnum(prop, values, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.values = values;
        return _this;
    }
    StringEnum.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'StringEnum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a string, but got " + typeof value)
            };
        }
        if (this.values.includes(value) === false) {
            return {
                name: 'StringEnum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be one of " + this.values.join(',') + ", but got " + value)
            };
        }
    };
    return StringEnum;
}(RuleBase_1.RuleBase));
exports.StringEnum = StringEnum;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=String.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_String) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_String, module.exports);
		return;
	}
	_src_validation_rules_String = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_Rule;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Required_1 = _src_validation_rules_Required;
var Length_1 = _src_validation_rules_Length;
var Pattern_1 = _src_validation_rules_Pattern;
var Custom_1 = _src_validation_rules_Custom;
var Number_1 = _src_validation_rules_Number;
var String_1 = _src_validation_rules_String;
var Rule;
(function (Rule) {
    function required(mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Required_1.Required(propertyKey, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.required = required;
    function minLength(count, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MinLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.minLength = minLength;
    function maxLength(count, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MaxLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.maxLength = maxLength;
    function minimum(val, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Number_1.Minimum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.minimum = minimum;
    function maximum(val, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Number_1.Maximum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.maximum = maximum;
    function pattern(pattern, mix) {
        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Pattern_1.Pattern(propertyKey, pattern, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.pattern = pattern;
    function stringEnum(values, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new String_1.StringEnum(propertyKey, values, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.stringEnum = stringEnum;
    function validate(fn, name) {
        if (name === void 0) { name = 'Custom'; }
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Custom_1.Custom(propertyKey, fn, name);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.validate = validate;
})(Rule = exports.Rule || (exports.Rule = {}));
var RuleUtil;
(function (RuleUtil) {
    // Unwrap Decorators in Json.meta
    function unboxRules(props) {
        var _loop_1 = function (key) {
            var rules = props[key].rules;
            if (rules == null) {
                return "continue";
            }
            var fns = rules.filter(function (x) { return typeof x === 'function'; });
            if (fns.length === 0) {
                return "continue";
            }
            var target = {};
            fns.map(function (fn) {
                fn(target, key);
            });
            var unboxed = JsonUtils_1.JsonUtils.resolvePropertyRules(target, key);
            var arr = rules.map(function (rule) {
                if (typeof rule === 'function') {
                    return unboxed.shift();
                }
                ;
                return rule;
            });
            props[key].rules = arr;
        };
        for (var key in props) {
            _loop_1(key);
        }
    }
    RuleUtil.unboxRules = unboxRules;
})(RuleUtil = exports.RuleUtil || (exports.RuleUtil = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Rule.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_Rule) && isObject(module.exports)) {
		Object.assign(_src_validation_Rule, module.exports);
		return;
	}
	_src_validation_Rule = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Json;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Rule_1 = _src_validation_Rule;
var Json;
(function (Json) {
    function ignore() {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonIgnore = true;
            return descriptor;
        };
    }
    Json.ignore = ignore;
    function name(name) {
        return function (target, propertyKey, descriptor) {
            var metaObj = JsonUtils_1.JsonUtils.resolveModelMeta(target);
            if (metaObj.nameMappings == null) {
                metaObj.nameMappings = {};
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.jsonName = name;
            metaObj.nameMappings[name] = metaProp;
            return descriptor;
        };
    }
    Json.name = name;
    function type(Ctor, options) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.type = type;
    function array(Ctor, options) {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.ArrayType = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.array = array;
    function value(mix) {
        console.log('Obsolete: renamed .defaultValue');
        return defaultValue(mix);
    }
    Json.value = value;
    function defaultValue(mix) {
        return function (target, propertyKey, descriptor) {
            var _a;
            var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
            var defs = (_a = metaModel.defaults, (_a !== null && _a !== void 0 ? _a : (metaModel.defaults = {})));
            defs[propertyKey] = mix;
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp["default"] = value;
            return descriptor;
        };
    }
    Json.defaultValue = defaultValue;
    function converter(Converter) {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = Converter;
            return descriptor;
        };
    }
    Json.converter = converter;
    function description(text) {
        return function (target, propertyKey, descriptor) {
            if (propertyKey == null) {
                var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
                metaModel.description = text;
                return;
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.description = text;
            return descriptor;
        };
    }
    Json.description = description;
    function meta(meta) {
        Rule_1.RuleUtil.unboxRules(meta.properties);
        return function (target, propertyKey, descriptor) {
            if (propertyKey == null) {
                var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
                Object.assign(metaModel, meta);
                return;
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.Meta = meta;
            return descriptor;
        };
    }
    Json.meta = meta;
    function stringify() {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = {
                toJSON: function (mix) {
                    if (typeof mix === 'string') {
                        return mix;
                    }
                    return JSON.stringify(mix);
                },
                fromJSON: function (mix) {
                    if (typeof mix !== 'string') {
                        return mix;
                    }
                    return JSON.parse(mix);
                }
            };
            return descriptor;
        };
    }
    Json.stringify = stringify;
})(Json = exports.Json || (exports.Json = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Json.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Json) && isObject(module.exports)) {
		Object.assign(_src_Json, module.exports);
		return;
	}
	_src_Json = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
function is_rawObject(x) {
    return x != null && typeof x === 'object' && x.constructor === Object;
}
exports.is_rawObject = is_rawObject;
function is_Array(arr) {
    return (arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function');
}
exports.is_Array = is_Array;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=is.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_is) && isObject(module.exports)) {
		Object.assign(_src_utils_is, module.exports);
		return;
	}
	_src_utils_is = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Types;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var is_1 = _src_utils_is;
var Types;
(function (Types) {
    function isValueType(x) {
        return x == null || typeof x !== 'object';
    }
    Types.isValueType = isValueType;
    function isArray(x) {
        return is_1.is_Array(x);
    }
    Types.isArray = isArray;
    function isObject(x) {
        if (x == null || typeof x !== 'object') {
            return false;
        }
        if (is_1.is_Array(x)) {
            return false;
        }
        if (x instanceof Date ||
            x instanceof RegExp ||
            x instanceof Number ||
            x instanceof String) {
            return false;
        }
        return true;
    }
    Types.isObject = isObject;
})(Types = exports.Types || (exports.Types = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Types.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Types) && isObject(module.exports)) {
		Object.assign(_src_Types, module.exports);
		return;
	}
	_src_Types = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonValidate;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var Required_1 = _src_validation_rules_Required;
var EMPTY = [];
var JsonValidate;
(function (JsonValidate) {
    function validate(model, settings) {
        var _a, _b, _c;
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        if (meta == null) {
            if (((_c = settings) === null || _c === void 0 ? void 0 : _c.mustValidate) === true) {
                return [
                    { message: 'Object has not validation meta information' }
                ];
            }
            return EMPTY;
        }
        var errors = validateByMeta(model, model, meta, '');
        return (errors !== null && errors !== void 0 ? errors : EMPTY);
    }
    JsonValidate.validate = validate;
    function validateProperty(model, key, settings) {
        var _a, _b, _c;
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        if (meta == null) {
            if (((_c = settings) === null || _c === void 0 ? void 0 : _c.mustValidate) === true) {
                return [
                    { message: 'Object has not validation meta information' }
                ];
            }
            return EMPTY;
        }
        var val = model[key];
        var propInfo = meta.properties[key];
        var errors = validateSingleValue(model, val, model, key, propInfo, '');
        return (errors !== null && errors !== void 0 ? errors : EMPTY);
    }
    JsonValidate.validateProperty = validateProperty;
    function validateByMeta(model, root, meta, path) {
        var _a, _b;
        if (meta == null) {
            return null;
        }
        var result = null;
        for (var key in model) {
            var val = model[key];
            var propInfo = meta.properties[key];
            var error = val == null
                ? checkOptional(model, (root !== null && root !== void 0 ? root : model), key, propInfo, path)
                : validateSingleValue(model, val, (root !== null && root !== void 0 ? root : model), key, propInfo, path);
            if (error) {
                (_a = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_a, error);
            }
        }
        for (var key in meta.properties) {
            if (key in model) {
                // was handled
                continue;
            }
            var propInfo = meta.properties[key];
            var error = checkOptional(model, (root !== null && root !== void 0 ? root : model), key, propInfo, path);
            if (error) {
                (_b = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_b, error);
            }
        }
        return result;
    }
    function validateSingleValue(model, val, root, key, propInfo, outerPath) {
        var _a, _b;
        var _c, _d, _e, _f, _g, _h, _j;
        var result = null;
        var rules = (_c = propInfo) === null || _c === void 0 ? void 0 : _c.rules;
        if (rules) {
            var error = execRules(val, model, rules, outerPath);
            if (error) {
                ((result !== null && result !== void 0 ? result : (result = []))).push(error);
            }
        }
        if (Types_1.Types.isValueType(val)) {
            return result;
        }
        if (Types_1.Types.isArray(val)) {
            var arr = val;
            var Type = (_d = propInfo) === null || _d === void 0 ? void 0 : _d.ArrayType;
            var innerMeta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                var $innerMeta = (_e = JsonUtils_1.JsonUtils.pickModelMeta(x), (_e !== null && _e !== void 0 ? _e : innerMeta));
                var parentPath = outerPath ? outerPath + "." + i : "" + i;
                var errors = validateByMeta(x, root, $innerMeta, parentPath);
                if (errors) {
                    (_a = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_a, errors);
                }
            }
            return result;
        }
        if (Types_1.Types.isObject(val)) {
            var obj = val;
            var Type = (_f = propInfo) === null || _f === void 0 ? void 0 : _f.Type;
            var innerMeta = (_j = (_g = JsonUtils_1.JsonUtils.pickModelMeta(Type), (_g !== null && _g !== void 0 ? _g : (_h = propInfo) === null || _h === void 0 ? void 0 : _h.Meta)), (_j !== null && _j !== void 0 ? _j : JsonUtils_1.JsonUtils.pickModelMeta(obj)));
            var parentPath = outerPath ? outerPath + "." + key : "" + key;
            var errors = validateByMeta(obj, root, innerMeta, parentPath);
            if (errors) {
                (_b = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_b, errors);
            }
            return result;
        }
        return result;
    }
    function execRules(val, root, rules, parentPath) {
        if (rules == null || rules.length === 0) {
            return null;
        }
        for (var i = 0; i < rules.length; i++) {
            var error = rules[i].validate(val, root);
            if (error != null) {
                if (parentPath) {
                    error.property = parentPath + "." + error.property;
                }
                return error;
            }
        }
        return null;
    }
    function checkOptional(model, root, key, propInfo, outerPath) {
        var _a, _b, _c, _d, _e;
        var rules = (_a = propInfo) === null || _a === void 0 ? void 0 : _a.rules;
        if (rules != null) {
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                if (rule instanceof Required_1.Required) {
                    var error = rule.validate(null, root);
                    if (error) {
                        error.property = outerPath ? outerPath + "." + key : "" + key;
                        return [error];
                    }
                }
            }
        }
        // check also deep nested properties, if any of them is required
        var meta = (_c = JsonUtils_1.JsonUtils.pickModelMeta((_b = propInfo) === null || _b === void 0 ? void 0 : _b.Type), (_c !== null && _c !== void 0 ? _c : (_d = propInfo) === null || _d === void 0 ? void 0 : _d.Meta));
        if (((_e = meta) === null || _e === void 0 ? void 0 : _e.properties) != null) {
            for (var prop in meta.properties) {
                var propInfo_1 = meta.properties[prop];
                var $outerPath = outerPath ? outerPath + "." + prop : "" + prop;
                var err = checkOptional(null, root, prop, propInfo_1, $outerPath);
                if (err) {
                    return err;
                }
            }
        }
        return null;
    }
})(JsonValidate = exports.JsonValidate || (exports.JsonValidate = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonValidate.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonValidate) && isObject(module.exports)) {
		Object.assign(_src_JsonValidate, module.exports);
		return;
	}
	_src_JsonValidate = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Serializable;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonConvert_1 = _src_JsonConvert;
var JsonValidate_1 = _src_JsonValidate;
var JsonUtils_1 = _src_JsonUtils;
// class Foo {
//     name: string
//     bar: Bar
//     arr: any[]
// }
// class Bar {
//     b1: string
//     b2: string
//     arr: any[]
// }
// function f (x: DeepPartial<Foo>) {}
// f({ name: 'hello', bar: { b1: 'B1' }, arr: [ 1 ] })
var Serializable = /** @class */ (function () {
    function Serializable(partial) {
        var _a;
        if (partial != null) {
            for (var key in partial) {
                this[key] = partial[key];
            }
        }
        var defs = (_a = JsonUtils_1.JsonUtils.pickModelMeta(this)) === null || _a === void 0 ? void 0 : _a.defaults;
        if (defs != null) {
            for (var key in defs) {
                if (this[key] == null) {
                    this[key] = defs[key];
                }
            }
        }
    }
    Serializable.fromJson = function (json, settings) {
        if (settings === void 0) { settings = { Type: null }; }
        console.warn('Obsolete (fromJson) - use fromJSON instead');
        return this.fromJSON(json, settings);
    };
    Serializable.fromJSON = function (json, settings) {
        if (settings === void 0) { settings = { Type: null }; }
        var _a;
        settings.Type = (_a = settings.Type, (_a !== null && _a !== void 0 ? _a : this));
        return JsonConvert_1.JsonConvert.fromJSON(json, settings);
    };
    Serializable.validate = function (x, settings) {
        if (settings === void 0) { settings = {}; }
        if (settings.Type == null) {
            settings.Type = this;
        }
        return JsonValidate_1.JsonValidate.validate(x, settings);
    };
    Serializable.prototype.toJson = function (settings) {
        console.warn('Obsolete (toJson) - use toJSON instead');
        return this.toJSON(settings);
    };
    Serializable.prototype.toJSON = function (settings) {
        return JsonConvert_1.JsonConvert.toJSON(this, settings);
    };
    Serializable.prototype.assign = function (partial) {
        Object.assign(this, partial);
        return this;
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Serializable.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Serializable) && isObject(module.exports)) {
		Object.assign(_src_Serializable, module.exports);
		return;
	}
	_src_Serializable = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonSerializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonConvert_1 = _src_JsonConvert;
var is_1 = _src_utils_is;
var JsonSerializer;
(function (JsonSerializer) {
    // export function serialize (x: any, Type: IConstructor, Converter: IJsonConverter, settings: JsonSettings) {
    //     if (Converter?.toJSON) {
    //         return Converter.toJSON(x, settings);
    //     }
    //     if (Types.isValueType(x)) {
    //         return x;
    //     }
    //     if (Types.isArray(x)) {
    //         let arr = new Array(x.length);
    //         for (let i = 0; i < x.length; i++) {
    //             arr[i] = serialize(x, info.ArrayType, settings);
    //         }
    //         return arr;
    //     }
    // }
    function serializeObject(model, Type, settings) {
        var _a, _b;
        if (Types_1.Types.isValueType(model)) {
            return model;
        }
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta(Type)));
        var json = Object.create(null);
        for (var key in model) {
            var propertyInfo = (_b = meta) === null || _b === void 0 ? void 0 : _b.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            var modelVal = model[key];
            if (typeof modelVal === 'function') {
                continue;
            }
            var property = toJsonName(key, propertyInfo, settings);
            var val = toJsonValue(modelVal, propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }
    JsonSerializer.serializeObject = serializeObject;
    function toJsonValue(val, info, settings) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((_b = (_a = info) === null || _a === void 0 ? void 0 : _a.Converter) === null || _b === void 0 ? void 0 : _b.toJSON) {
            return info.Converter.toJSON(val, settings);
        }
        if (Types_1.Types.isValueType(val)) {
            var type_1 = typeof val;
            var types = (_c = settings) === null || _c === void 0 ? void 0 : _c.types;
            if (types != null && typeof ((_d = types[type_1]) === null || _d === void 0 ? void 0 : _d.toJSON) === 'function') {
                return (_e = types[type_1]) === null || _e === void 0 ? void 0 : _e.toJSON(val);
            }
            switch (type_1) {
                case 'bigint':
                    return "0x" + val.toString(16);
            }
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var arr = new Array(val.length);
            for (var i = 0; i < val.length; i++) {
                arr[i] = serializeObject(val[i], (_f = info) === null || _f === void 0 ? void 0 : _f.ArrayType, settings);
            }
            return arr;
        }
        if (is_1.is_rawObject(val)) {
            var obj = Object.create(null);
            for (var key in val) {
                obj[key] = JsonSerializer.toJsonValue(val[key], null, settings);
            }
            return obj;
        }
        var type = (_h = (_g = info) === null || _g === void 0 ? void 0 : _g.Type, (_h !== null && _h !== void 0 ? _h : val.constructor));
        var converter = JsonConvert_1.JsonConverters.find(function (x) { return x.supports(val, type); });
        if (converter) {
            return converter.toJSON(val, settings);
        }
        if (JsonUtils_1.JsonUtils.hasModelMeta(val)) {
            return JsonConvert_1.JsonConvert.toJSON(val, settings);
        }
        return val;
    }
    JsonSerializer.toJsonValue = toJsonValue;
    function toJsonName(key, info, settings) {
        var _a, _b;
        if (((_a = info) === null || _a === void 0 ? void 0 : _a.jsonName) != null) {
            return info.jsonName;
        }
        var type = (_b = settings) === null || _b === void 0 ? void 0 : _b.propertyResolver;
        if (type == null) {
            return key;
        }
        if (type === 'camelCase') {
            return key.replace(/(_+)(\w)/g, function (full, underscore, letter, i) {
                if (i === 0) {
                    return full;
                }
                return letter.toUpperCase();
            });
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, function (full, letter) { return "" + letter.toLowerCase(); })
                .replace(/([A-Z])/g, function (full, letter, i) {
                if (i === 0) {
                    return full;
                }
                return "_" + letter.toLowerCase();
            });
        }
        throw new Error("Invalid propertyResolver name: " + type);
    }
    JsonSerializer.toJsonName = toJsonName;
})(JsonSerializer = exports.JsonSerializer || (exports.JsonSerializer = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSerializer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSerializer) && isObject(module.exports)) {
		Object.assign(_src_JsonSerializer, module.exports);
		return;
	}
	_src_JsonSerializer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonDeserializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonConvert_1 = _src_JsonConvert;
var Serializable_1 = _src_Serializable;
var JsonSerializer_1 = _src_JsonSerializer;
var JsonDeserializer;
(function (JsonDeserializer) {
    function deserialize(json, meta, settings) {
        var model = fromJsonToModel(json, meta, settings);
        if (meta.Type) {
            var Mix = meta.Type;
            if (Mix.fromJSON && Mix.fromJSON !== Serializable_1.Serializable.fromJSON) {
                return Mix.fromJSON(model);
            }
            var instance = new Mix();
            if (instance.fromJSON && instance.fromJSON !== Serializable_1.Serializable.fromJSON) {
                instance.fromJSON(model);
                return instance;
            }
            for (var key in model) {
                instance[key] = model[key];
                ;
            }
            return instance;
        }
        return model;
    }
    JsonDeserializer.deserialize = deserialize;
    function fromJsonToModel(json, meta, settings) {
        var _a;
        if (Types_1.Types.isArray(json)) {
            return json.map(function (value) { return fromJsonToModel(value, meta, settings); });
        }
        var model = Object.create(null);
        for (var key in json) {
            var property = resolveName(key, meta.nameMappings, meta, settings);
            var info = (_a = meta) === null || _a === void 0 ? void 0 : _a.properties[property];
            var value = resolveValue(json[key], info, settings);
            model[property] = value;
        }
        return model;
    }
    JsonDeserializer.fromJsonToModel = fromJsonToModel;
    function resolveValue(val, info, settings) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (val == null) {
            return null;
        }
        if ((_b = (_a = info) === null || _a === void 0 ? void 0 : _a.Converter) === null || _b === void 0 ? void 0 : _b.fromJSON) {
            return info.Converter.fromJSON(val, settings);
        }
        var Type = (_c = info) === null || _c === void 0 ? void 0 : _c.Type;
        if (Type != null) {
            if (Type === Number) {
                return typeof val === 'number'
                    ? val
                    : Number(val);
            }
            if (Type === String) {
                return typeof val === 'string'
                    ? val
                    : String(val);
            }
            if (Type === Boolean) {
                if (typeof val === 'string') {
                    if (val === '0' || val === 'false') {
                        return false;
                    }
                }
                return Boolean(val);
            }
            if (Type === $BigInt) {
                var fromJson = (_e = (_d = settings.types) === null || _d === void 0 ? void 0 : _d.bigint) === null || _e === void 0 ? void 0 : _e.fromJSON;
                if (fromJson != null) {
                    return fromJson(val);
                }
                return typeof val === 'bigint'
                    ? val
                    : BigInt(val);
            }
            var converter = null;
            for (var i = 0; i < JsonConvert_1.JsonConverters.length; i++) {
                if (JsonConvert_1.JsonConverters[i].supports(val, Type)) {
                    converter = JsonConvert_1.JsonConverters[i];
                    break;
                }
            }
            if (converter) {
                return converter.fromJSON(val, settings);
            }
            var meta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
            if (meta) {
                return deserialize(val, meta, settings);
            }
            var Ctor = Type;
            return new Ctor(val);
        }
        var Meta = (_f = info) === null || _f === void 0 ? void 0 : _f.Meta;
        if (Meta) {
            return deserialize(val, Meta, settings);
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var out = new Array(val.length);
            var arrayType = (_g = info) === null || _g === void 0 ? void 0 : _g.ArrayType;
            var converter = (_h = info) === null || _h === void 0 ? void 0 : _h.Converter;
            var itemInfo = {
                Type: arrayType,
                Converter: converter
            };
            for (var i = 0; i < val.length; i++) {
                out[i] = resolveValue(val[i], itemInfo, settings);
            }
            return out;
        }
        return val;
    }
    JsonDeserializer.resolveValue = resolveValue;
    function resolveName(key, mappings, meta, settings) {
        var _a;
        var info = (_a = mappings) === null || _a === void 0 ? void 0 : _a[key];
        if (info != null) {
            return info.property;
        }
        return JsonSerializer_1.JsonSerializer.toJsonName(key, info, settings);
    }
    JsonDeserializer.resolveName = resolveName;
})(JsonDeserializer = exports.JsonDeserializer || (exports.JsonDeserializer = {}));
var $BigInt = typeof BigInt !== 'undefined' ? BigInt : null;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonDeserializer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonDeserializer) && isObject(module.exports)) {
		Object.assign(_src_JsonDeserializer, module.exports);
		return;
	}
	_src_JsonDeserializer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonConvert;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonDeserializer_1 = _src_JsonDeserializer;
var JsonSerializer_1 = _src_JsonSerializer;
var JsonConvert;
(function (JsonConvert) {
    function toJson(model, settings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    JsonConvert.toJson = toJson;
    function toJSON(model, settings) {
        var _a;
        if (Types_1.Types.isArray(model)) {
            return model.map(function (x) { return toJSON(x, settings); });
        }
        return JsonSerializer_1.JsonSerializer.serializeObject(model, (_a = settings) === null || _a === void 0 ? void 0 : _a.Type, settings);
    }
    JsonConvert.toJSON = toJSON;
    function fromJson(model, settings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    JsonConvert.fromJson = fromJson;
    function fromJSON(json, settings) {
        var _a, _b;
        if (Types_1.Types.isArray(json)) {
            return json.map(function (x) { return fromJSON(x, settings); });
        }
        var Type = (_a = settings) === null || _a === void 0 ? void 0 : _a.Type;
        var meta = (_b = JsonUtils_1.JsonUtils.pickModelMeta(Type), (_b !== null && _b !== void 0 ? _b : getMetaFor(Type)));
        return JsonDeserializer_1.JsonDeserializer.deserialize(json, meta, settings);
    }
    JsonConvert.fromJSON = fromJSON;
    function stringify(instance, settings) {
        var _a;
        var json = toJSON(instance, settings);
        return JSON.stringify(json, null, (_a = settings) === null || _a === void 0 ? void 0 : _a.space);
    }
    JsonConvert.stringify = stringify;
    function parse(str, settings) {
        var json = JSON.parse(str);
        return fromJSON(json, settings);
    }
    JsonConvert.parse = parse;
})(JsonConvert = exports.JsonConvert || (exports.JsonConvert = {}));
exports.JsonConverters = [
    {
        name: 'date',
        supports: function (val, type) {
            return type === Date || val instanceof Date;
        },
        toJSON: function (val) {
            return val;
        },
        fromJSON: function (val) {
            return typeof val === 'string'
                ? new Date(val)
                : val;
        }
    },
    {
        name: 'regex',
        supports: function (val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJSON: function (val) {
            return val.toString();
        },
        fromJSON: function (val) {
            var pattern = val.substring(1, val.lastIndexOf('/'));
            var flags = val.substring(val.lastIndexOf('/') + 1);
            return new RegExp(pattern, flags);
        }
    }
];
/** Perf: reuse default empty metas */
var DEFAULT_META = {
    Type: null,
    properties: {},
    defaults: null
};
function getMetaFor(Type) {
    DEFAULT_META.Type = Type;
    return DEFAULT_META;
}
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonConvert.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonConvert) && isObject(module.exports)) {
		Object.assign(_src_JsonConvert, module.exports);
		return;
	}
	_src_JsonConvert = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonSettings;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSettings.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSettings) && isObject(module.exports)) {
		Object.assign(_src_JsonSettings, module.exports);
		return;
	}
	_src_JsonSettings = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonSchema;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var obj_1 = _src_utils_obj;
var Pattern_1 = _src_validation_rules_Pattern;
var Required_1 = _src_validation_rules_Required;
var Length_1 = _src_validation_rules_Length;
var Number_1 = _src_validation_rules_Number;
var Custom_1 = _src_validation_rules_Custom;
var String_1 = _src_validation_rules_String;
var JsonSchema;
(function (JsonSchema) {
    function getSchema(Type, schema) {
        var _a, _b, _c, _d;
        if (Type == null) {
            return {
                type: 'any'
            };
        }
        if (((_a = schema) === null || _a === void 0 ? void 0 : _a.type) === 'array') {
            return {
                type: 'array',
                items: getSchema(Type)
            };
        }
        if (Type === String) {
            return {
                type: 'string'
            };
        }
        if (Type === Boolean) {
            return {
                type: 'boolean'
            };
        }
        if (Type === Number) {
            return {
                type: 'number'
            };
        }
        if (Type === Date) {
            return {
                type: 'string',
                format: 'date-time'
            };
        }
        if (Type === RegExp) {
            return {
                type: 'string',
                format: 'regex'
            };
        }
        var object = {
            type: 'object',
            properties: {}
        };
        var meta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
        if (((_b = meta) === null || _b === void 0 ? void 0 : _b.properties) != null) {
            for (var prop in meta.properties) {
                var propMeta = meta.properties[prop];
                var props = object.properties;
                if (propMeta.ArrayType) {
                    props[prop] = getSchema(propMeta.ArrayType, { type: 'array' });
                    if (propMeta.description) {
                        props[prop].description = propMeta.description;
                    }
                    continue;
                }
                props[prop] = getSchema((_c = propMeta) === null || _c === void 0 ? void 0 : _c.Type, null);
                if (propMeta.rules) {
                    for (var _i = 0, _e = propMeta.rules; _i < _e.length; _i++) {
                        var rule = _e[_i];
                        if (rule instanceof Pattern_1.Pattern) {
                            props[prop].pattern = rule.pattern.toString();
                            continue;
                        }
                        if (rule instanceof Required_1.Required) {
                            if (object.required == null) {
                                object.required = [];
                            }
                            object.required.push(prop);
                            continue;
                        }
                        if (rule instanceof Length_1.MinLength) {
                            props[prop].minLength = rule.count;
                            continue;
                        }
                        if (rule instanceof Length_1.MaxLength) {
                            props[prop].maxLength = rule.count;
                            continue;
                        }
                        if (rule instanceof Number_1.Minimum) {
                            props[prop].minimum = rule.value;
                            continue;
                        }
                        if (rule instanceof Number_1.Maximum) {
                            props[prop].maximum = rule.value;
                            continue;
                        }
                        if (rule instanceof Custom_1.Custom) {
                            props[prop].validation = rule.fn.toString();
                        }
                        if (rule instanceof String_1.StringEnum) {
                            props[prop]["enum"] = rule.values;
                        }
                    }
                }
                if (propMeta["default"] != null) {
                    props[prop]["default"] = propMeta["default"];
                }
                if (propMeta.description) {
                    props[prop].description = propMeta.description;
                }
            }
        }
        if ((_d = meta) === null || _d === void 0 ? void 0 : _d.description) {
            object.description = meta.description;
        }
        var keys = obj_1.obj_getKeys(Type.prototype);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in object.properties
                || key === '__json__'
                || key === 'toJSON'
                || key === 'toJson') {
                continue;
            }
            ;
            var val = Type.prototype[key];
            if (typeof val === 'function') {
                continue;
            }
            object.properties[key] = getSchema(val);
        }
        return object;
    }
    JsonSchema.getSchema = getSchema;
})(JsonSchema = exports.JsonSchema || (exports.JsonSchema = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSchema.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSchema) && isObject(module.exports)) {
		Object.assign(_src_JsonSchema, module.exports);
		return;
	}
	_src_JsonSchema = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
exports.__esModule = true;
var Json_1 = _src_Json;
exports.Json = Json_1.Json;
var Rule_1 = _src_validation_Rule;
exports.Rule = Rule_1.Rule;
var JsonConvert_1 = _src_JsonConvert;
exports.JsonConvert = JsonConvert_1.JsonConvert;
var JsonValidate_1 = _src_JsonValidate;
exports.JsonValidate = JsonValidate_1.JsonValidate;
var Serializable_1 = _src_Serializable;
exports.Serializable = Serializable_1.Serializable;
var JsonSettings_1 = _src_JsonSettings;
exports.JsonSettings = JsonSettings_1.JsonSettings;
var JsonUtils_1 = _src_JsonUtils;
exports.JsonUtils = JsonUtils_1.JsonUtils;
var JsonSchema_1 = _src_JsonSchema;
exports.JsonSchema = JsonSchema_1.JsonSchema;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map

}));

// end:source ./UMD.js
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_class_json_lib_class_json === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_class_json_lib_class_json) && __isObj(module.exports)) {
        Object.assign(_node_modules_class_json_lib_class_json, module.exports);
    } else {
        _node_modules_class_json_lib_class_json = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_json_JsonArrayStore;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_json_JsonArrayStore != null ? _dequanto_src_json_JsonArrayStore : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonArrayStore = void 0;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const memd_1 = __importDefault(require("memd"));
const alot_1 = __importDefault(require("alot"));
const class_json_1 = _node_modules_class_json_lib_class_json;
class JsonArrayStore {
    constructor(options) {
        this.options = options;
        this.fs = new JsonArrayFs(this.options.path, this.options.Type, this.options.map, this.options.format);
        let keyFn = this.options.key;
        if (keyFn == null) {
            throw new Error('Key getter must be defined');
        }
    }
    async query() {
        let arr = await this.getAll();
        return (0, alot_1.default)(arr);
    }
    async getAll(opts) {
        if (this.fs.errored != null) {
            throw this.fs.errored;
        }
        if (this.array == null) {
            await this.restore();
        }
        let arr = this.array;
        if (opts?.cloned) {
            arr = class_json_1.JsonConvert.fromJSON(class_json_1.JsonConvert.toJSON(arr));
        }
        return arr;
    }
    async getDict() {
        if (this.fs.errored != null) {
            throw this.fs.errored;
        }
        if (this.hash != null) {
            return this.hash;
        }
        await this.restore();
        return this.hash;
    }
    async getSingle(key) {
        if (this.fs.errored != null) {
            throw this.fs.errored;
        }
        if (this.hash == null) {
            await this.restore();
        }
        return this.hash[String(key)];
    }
    async saveAll(arr) {
        let keyFn = this.options.key;
        this.array = arr;
        this.hash = (0, alot_1.default)(arr).toDictionary(x => String(keyFn(x)), x => x);
        await this.fs.write(arr);
        return arr;
    }
    async upsert(x) {
        if (this.hash == null) {
            await this.restore();
        }
        let entry = this.upsertSync(x);
        await this.flush();
        return entry;
    }
    async remove(key) {
        if (this.hash == null) {
            await this.restore();
        }
        let entry = this.removeSync(key);
        await this.flush();
        return entry;
    }
    async upsertMany(arr) {
        if (this.hash == null) {
            await this.restore();
        }
        let entries = arr.map(x => this.upsertSync(x));
        await this.flush();
        return entries;
    }
    getLock() {
        return this.fs.lock;
    }
    async restore() {
        let arr = await this.fs.read();
        let keyFn = this.options.key;
        if (this.array != null) {
            // write was called inbetween
            return;
        }
        this.array = arr;
        this.hash = (0, alot_1.default)(arr).toDictionary(x => String(keyFn(x)), x => x);
    }
    async flush() {
        return await this.fs.write(this.array);
    }
    /** without flush */
    upsertSync(x) {
        let keyFn = this.options.key;
        let key = String(keyFn(x));
        if (key == null) {
            throw new Error(`Key is undefined in ${JSON.stringify(x)}`);
        }
        let current = this.hash[key];
        if (current) {
            for (let prop in x) {
                current[prop] = x[prop];
            }
            return current;
        }
        let entry = x;
        let Type = this.options.Type;
        if (Type != null && entry instanceof Type === false) {
            entry = new Type(x);
        }
        this.array.push(entry);
        this.hash[key] = entry;
        return entry;
    }
    removeSync(key) {
        let current = this.hash[key];
        if (current == null) {
            return null;
        }
        delete this.hash[key];
        let i = this.array.indexOf(current);
        if (i > -1) {
            this.array.splice(i, 1);
        }
        return current;
    }
}
exports.JsonArrayStore = JsonArrayStore;
class JsonArrayFs {
    constructor(path, Type, mapFn, format) {
        this.path = path;
        this.Type = Type;
        this.mapFn = mapFn;
        this.format = format;
        this.errored = null;
        this.listeners = [];
        this.version = 0;
        this.busy = false;
        this.pathBak = this.path + '.bak';
        this.pathFilename = this.path.substring(this.path.lastIndexOf('/') + 1);
        this.lock = new atma_utils_1.class_Dfr;
        this.lock.resolve();
    }
    write(arr) {
        this.array = arr;
        let dfr = new atma_utils_1.class_Dfr;
        this.listeners.push({
            version: ++this.version,
            promise: dfr
        });
        if (this.busy === true) {
            this.pending = arr;
            return dfr;
        }
        this.busy = true;
        this.lock.defer();
        this.writeInner(arr);
        return dfr;
    }
    async read() {
        if (this.array != null) {
            return Promise.resolve(this.array);
        }
        let arr = await this.readInner();
        return this.array = arr;
    }
    async readInner() {
        let existsBak = await atma_io_1.File.existsAsync(this.pathBak);
        if (existsBak) {
            let arr = await Fs.read(this.pathBak);
            if (this.array) {
                // When `write` was called inbetween `exists` check and now
                return this.array;
            }
            if (arr) {
                await atma_io_1.File.renameAsync(this.pathBak, this.pathFilename);
                return arr;
            }
            else {
                await atma_io_1.File.removeAsync(this.pathBak);
            }
        }
        let exists = await atma_io_1.File.existsAsync(this.path);
        if (exists === false) {
            return [];
        }
        if (!this.path) {
            throw new Error(`Read inner: ${this.path}/${this.pathBak} is undefined`);
        }
        let arr = await atma_io_1.File.readAsync(this.path);
        if (this.Type) {
            let rgx = Math.round(Math.random() * 100000);
            let key = `JsonArray.Type ${rgx}`;
            console.time(key);
            arr = arr.map(x => class_json_1.JsonConvert.fromJSON(x, { Type: this.Type }));
            console.timeEnd(key);
        }
        if (this.mapFn) {
            arr = arr.map(this.mapFn);
        }
        return arr;
    }
    async writeInner(arr) {
        try {
            let v = this.version;
            let data = Fs.serialize(arr, this.Type, this.format);
            await atma_io_1.File.writeAsync(this.pathBak, data);
            await atma_io_1.File.renameAsync(this.pathBak, this.pathFilename);
            this.callWriteListeners(v, null);
        }
        catch (error) {
            console.error(`JsonArrayStore.WriteInner`, error);
            this.errored = error;
        }
        finally {
            if (this.pending == null) {
                this.busy = false;
                this.lock.resolve();
                return;
            }
            let next = this.pending;
            this.pending = null;
            this.writeInner(next);
        }
    }
    callWriteListeners(v, error = null) {
        for (let i = 0; i < this.listeners.length; i++) {
            let x = this.listeners[i];
            if (x.version <= v) {
                try {
                    if (error != null) {
                        x.promise.reject(error);
                    }
                    else {
                        x.promise.resolve();
                    }
                }
                finally {
                    this.listeners.splice(i, 1);
                    i--;
                }
            }
        }
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], JsonArrayFs.prototype, "readInner", null);
var Fs;
(function (Fs) {
    function serialize(arr, Type, format) {
        if (Type) {
            arr = arr.map(x => class_json_1.JsonConvert.toJSON(x));
        }
        return JSON.stringify(arr, null, format ? '  ' : null);
    }
    Fs.serialize = serialize;
    function parse(str) {
        return JSON.parse(str);
    }
    Fs.parse = parse;
    async function read(path) {
        if (!path) {
            throw new Error(`${path} is undefined`);
        }
        let str = await atma_io_1.File.readAsync(path, { skipHooks: true, encoding: 'utf8' });
        if (str.length === 0) {
            return null;
        }
        try {
            return JSON.parse(str);
        }
        catch (error) {
            return null;
        }
    }
    Fs.read = read;
})(Fs || (Fs = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_json_JsonArrayStore === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_json_JsonArrayStore) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_json_JsonArrayStore, module.exports);
    } else {
        _dequanto_src_json_JsonArrayStore = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_utils_AbiDeserializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_utils_AbiDeserializer != null ? _dequanto_src_contracts_utils_AbiDeserializer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiDeserializer = void 0;
const _abiType_1 = _dequanto_src_utils__abiType;
const _abiParser_1 = _dequanto_src_utils__abiParser;
var AbiDeserializer;
(function (AbiDeserializer) {
    function process(result, types) {
        let type = _abiParser_1.$abiParser.getReturnTypeFromTypes(types);
        if (typeof result === 'object') {
            if (type === 'array') {
                return toArray(result, types);
            }
            if (type === 'object') {
                return toObject(result, types);
            }
        }
        return toType(result, types[0]);
    }
    AbiDeserializer.process = process;
    function toType(val, type) {
        if (type == null) {
            return val;
        }
        if (typeof val === 'string') {
            let tsType = _abiType_1.$abiType.getTsType(type.type);
            switch (tsType) {
                case 'bigint':
                    return BigInt(val);
                case 'number':
                    return Number(val);
            }
        }
        if (type.type === 'tuple[]') {
            if (Array.isArray(val) === false) {
                throw new Error(`${type.name} tuple[] expects array to deserialize. Got ${val}`);
            }
            return val.map(item => {
                return process(item, type.components);
            });
        }
        return val;
    }
    function toArray(value, types) {
        value = normalizeArray(value);
        if (Array.isArray(value) === false) {
            throw new Error(`Array expected of types: ${types.map(x => x.type)}; Got ${value}`);
        }
        let out = [];
        for (let i = 0; i < types.length; i++) {
            out[i] = toType(value[i], types[i]);
        }
        return out;
    }
    function toObject(value, types) {
        let properties = Object.create(null);
        types.forEach(type => {
            properties[type.name] = type;
        });
        let out = Object.create(null);
        for (let key in value) {
            if (/^\d+$/.test(key)) {
                continue;
            }
            let info = properties[key];
            out[key] = toType(value[key], info);
        }
        return out;
    }
    // { 0: a, 1: b, 2: c } to array
    function normalizeArray(val) {
        if (Array.isArray(val)) {
            return val;
        }
        let out = [];
        let length = 0;
        let keys = 0;
        for (let key in val) {
            if (/^\d+$/.test(key)) {
                length++;
                out[Number(key)] = val[key];
                continue;
            }
            keys++;
        }
        if (length === 0 && keys > 0) {
            return val;
        }
        return out;
    }
})(AbiDeserializer = exports.AbiDeserializer || (exports.AbiDeserializer = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_utils_AbiDeserializer === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_utils_AbiDeserializer) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_utils_AbiDeserializer, module.exports);
    } else {
        _dequanto_src_contracts_utils_AbiDeserializer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractReader;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractReader != null ? _dequanto_src_contracts_ContractReader : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractReaderUtils = exports.ContractReader = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const AbiDeserializer_1 = _dequanto_src_contracts_utils_AbiDeserializer;
const BlockDateResolver_1 = _dequanto_src_blocks_BlockDateResolver;
const atma_utils_1 = require("atma-utils");
const _is_1 = _dequanto_src_utils__is;
const _logger_1 = _dequanto_src_utils__logger;
const _abiParser_1 = _dequanto_src_utils__abiParser;
class ContractReader {
    constructor(client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client)) {
        this.client = client;
        this.options = {};
    }
    forBlock(blockNumber) {
        this.blockNumberTask = blockNumber == null
            ? null
            : Promise.resolve(blockNumber);
        return this;
    }
    forBlockAt(date) {
        if (date != null) {
            let resolver = new BlockDateResolver_1.BlockDateResolver(this.client);
            this.blockNumberTask = resolver.getBlockNumberFor(date);
        }
        else {
            this.blockNumberTask = null;
        }
        return this;
    }
    withAddress(address) {
        this.options.from = address;
        return this;
    }
    async getStorageAt(address, position) {
        let blockNumber = void 0;
        if (this.blockNumberTask != null) {
            blockNumber = await this.blockNumberTask;
        }
        return this.client.getStorageAt(address, position, blockNumber);
    }
    async readAsync(address, methodAbi, ...params) {
        let blockNumber = void 0;
        if (this.blockNumberTask != null) {
            blockNumber = await this.blockNumberTask;
        }
        let abi;
        if (typeof methodAbi === 'string') {
            abi = _abiParser_1.$abiParser.parseMethod(methodAbi);
        }
        else {
            abi = methodAbi;
        }
        let method = abi.name;
        let abiArr = [abi];
        try {
            let result = await this.client.readContract({
                address,
                abi: abiArr,
                method: method,
                arguments: params,
                blockNumber: blockNumber,
                options: this.options
            });
            if (result == null) {
                throw new Error(`Function call returned undefined`);
            }
            return AbiDeserializer_1.AbiDeserializer.process(result, abi.outputs);
        }
        catch (error) {
            let args = params.map((x, i) => `[${i}] ${x}`).join('\n');
            throw new Error(`Contract: ${address} ${methodAbi} with \n${args}\nfailed with ${error.message}`);
        }
    }
    async executeBatch(values) {
        let requests = await (0, alot_1.default)(values)
            .mapAsync(async (x) => await x)
            .toArrayAsync();
        // all inputs should be deferred requests
        let invalid = requests.find(x => _is_1.$is.Address(x.request?.address) === false);
        if (invalid != null) {
            _logger_1.$logger.error('Invalid object', invalid);
            throw new Error(`Invalid Deferred Request at position ${requests.indexOf(invalid)}`);
        }
        let inputs = await (0, alot_1.default)(requests).mapAsync(async (req) => {
            return {
                address: req.request.address,
                abi: req.request.abi,
                params: req.request.params,
                blockNumber: req.request.blockNumber,
                options: req.request.options,
            };
        }).toArrayAsync();
        let results = await ContractReaderUtils.readAsyncBatch(this.client, inputs);
        return results;
    }
    async getLogs() {
    }
    static async read(client, address, methodAbi) {
        let reader = new ContractReader(client);
        return reader.readAsync(address, methodAbi);
    }
}
exports.ContractReader = ContractReader;
var ContractReaderUtils;
(function (ContractReaderUtils) {
    class DefferedRequest {
        constructor(request) {
            this.request = request;
            this.promise = Object.assign(new atma_utils_1.class_Dfr(), {
                request: this
            });
        }
    }
    ContractReaderUtils.DefferedRequest = DefferedRequest;
    async function readAsyncBatch(client, requests) {
        let reqs = await (0, alot_1.default)(requests).map(async (request) => {
            let abi = request.abi;
            if (typeof abi === 'string') {
                abi = _abiParser_1.$abiParser.parseMethod(abi);
            }
            let blockNumber = request.blockNumber;
            if (blockNumber instanceof Date) {
                let resolver = a_di_1.default.resolve(BlockDateResolver_1.BlockDateResolver, client);
                blockNumber = await resolver.getBlockNumberFor(blockNumber);
            }
            return {
                address: request.address,
                abi: [abi],
                method: abi.name,
                arguments: request.params,
                blockNumber: blockNumber,
                options: request.options
            };
        }).toArrayAsync();
        let results = await client.readContractBatch(reqs);
        return results.map((result, i) => {
            if (result == null || result instanceof Error) {
                return result;
            }
            let outputs = reqs[i].abi[0].outputs;
            return AbiDeserializer_1.AbiDeserializer.process(result, outputs);
        });
    }
    ContractReaderUtils.readAsyncBatch = readAsyncBatch;
})(ContractReaderUtils = exports.ContractReaderUtils || (exports.ContractReaderUtils = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractReader === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractReader) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractReader, module.exports);
    } else {
        _dequanto_src_contracts_ContractReader = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_ns_utils__ns;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_ns_utils__ns != null ? _dequanto_src_ns_utils__ns : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ns = void 0;
const web3_1 = __importDefault(require("web3"));
var $ns;
(function ($ns) {
    function namehash(domain) {
        let labels = domain.toLowerCase().split('.');
        let node = '0x' + ''.padStart(64, '0');
        for (let i = labels.length - 1; i >= 0; i--) {
            let labelSha = web3_1.default.utils.keccak256(labels[i]).substring(2);
            node = web3_1.default.utils.keccak256(`${node}${labelSha}`);
        }
        return node;
    }
    $ns.namehash = namehash;
})($ns = exports.$ns || (exports.$ns = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_ns_utils__ns === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_ns_utils__ns) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_ns_utils__ns, module.exports);
    } else {
        _dequanto_src_ns_utils__ns = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_ns_providers_EnsProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_ns_providers_EnsProvider != null ? _dequanto_src_ns_providers_EnsProvider : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsProvider = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const ContractReader_1 = _dequanto_src_contracts_ContractReader;
const _config_1 = _dequanto_src_utils__config;
const _require_1 = _dequanto_src_utils__require;
const _ns_1 = _dequanto_src_ns_utils__ns;
class EnsProvider {
    constructor(client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client)) {
        this.client = client;
    }
    supports(domain) {
        return /\.eth$/.test(domain);
    }
    async getAddress(domain) {
        let hash = _ns_1.$ns.namehash(domain);
        let resolverAddr = await this.getResolverAddress(hash);
        let address = await this.resolveAddress(hash, resolverAddr);
        return address;
    }
    async resolveAddress(hash, resolverAddr) {
        let registryAddr = _config_1.$config.get('ns.ens.registry');
        _require_1.$require.Address(registryAddr);
        let reader = new ContractReader_1.ContractReader(this.client);
        let address = await reader.readAsync(resolverAddr, `addr(bytes32):address`, hash);
        return address;
    }
    async getResolverAddress(hash) {
        let registryAddr = _config_1.$config.get('ns.ens.registry');
        _require_1.$require.Address(registryAddr);
        let reader = new ContractReader_1.ContractReader(this.client);
        let address = await reader.readAsync(registryAddr, `resolver(bytes32):address`, hash);
        return address;
    }
}
exports.EnsProvider = EnsProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_ns_providers_EnsProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_ns_providers_EnsProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_ns_providers_EnsProvider, module.exports);
    } else {
        _dequanto_src_ns_providers_EnsProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_ns_NameService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_ns_NameService != null ? _dequanto_src_ns_NameService : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameService = void 0;
const _require_1 = _dequanto_src_utils__require;
const EnsProvider_1 = _dequanto_src_ns_providers_EnsProvider;
class NameService {
    constructor(client) {
        this.client = client;
        this.providers = [
            new EnsProvider_1.EnsProvider(this.client)
        ];
    }
    getAddress(domain) {
        let provider = this.providers.find(x => x.supports(domain));
        _require_1.$require.notNull(provider, `NS Provider for ${domain} not found`);
        return provider.getAddress(domain);
    }
    supports(mix) {
        return this.providers.some(x => x.supports(mix));
    }
}
exports.NameService = NameService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_ns_NameService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_ns_NameService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_ns_NameService, module.exports);
    } else {
        _dequanto_src_ns_NameService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_ChainAccountsService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_ChainAccountsService != null ? _dequanto_src_ChainAccountsService : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainAccountsService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const ChainAccountProvider_1 = _dequanto_src_ChainAccountProvider;
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const NameService_1 = _dequanto_src_ns_NameService;
const _address_1 = _dequanto_src_utils__address;
const _is_1 = _dequanto_src_utils__is;
class ChainAccountsService {
    constructor() {
        this.store = a_di_1.default.resolve(Store);
        this.config = ChainAccountProvider_1.ChainAccountProvider;
    }
    async get(mix, platform) {
        if (_is_1.$is.hexString(mix) && mix.length >= 64) {
            return {
                address: ChainAccountProvider_1.ChainAccountProvider.getAddressFromKey(mix),
                key: mix
            };
        }
        if (_address_1.$address.isValid(mix) === false) {
            // Check NS
            let ns = a_di_1.default.resolve(NameService_1.NameService);
            if (ns.supports(mix)) {
                let address = await ns.getAddress(mix);
                if (address) {
                    mix = address;
                }
            }
        }
        let acc = this.config.tryGet(mix, platform);
        return acc ?? this.store.get(mix);
    }
    async getAll() {
        return this.store.getAll();
    }
    async generate(opts) {
        let current = await this.get(opts.name, opts.platform);
        if (current) {
            return current;
        }
        let account = this.config.generate(opts);
        await this.store.save(account);
        return account;
    }
    async generateMany(names, platform) {
        let newAccounts = [];
        let accounts = await (0, alot_1.default)(names).mapAsync(async (name) => {
            let current = await this.get(name, platform);
            if (current) {
                return current;
            }
            let account = this.config.generate({ name, platform });
            newAccounts.push(account);
            return account;
        }).toArrayAsync();
        if (newAccounts.length > 0) {
            await this.store.saveMany(newAccounts);
        }
        return accounts;
    }
}
exports.ChainAccountsService = ChainAccountsService;
class Store {
    constructor() {
        this.fs = new JsonArrayStore_1.JsonArrayStore({
            path: './db/accounts/accounts.json',
            key: x => (x.key ?? x.address),
            format: true,
        });
    }
    async get(mix) {
        let accounts = await this.fs.getAll();
        if (_address_1.$address.isValid(mix)) {
            return accounts.find(x => _address_1.$address.eq(mix, x.address));
        }
        return accounts.find(x => x.name === mix);
    }
    async getAll() {
        return await this.fs.getAll();
    }
    async save(account) {
        await this.fs.upsert(account);
    }
    async saveMany(accounts) {
        await this.fs.upsertMany(accounts);
    }
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_ChainAccountsService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_ChainAccountsService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_ChainAccountsService, module.exports);
    } else {
        _dequanto_src_ChainAccountsService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__class;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__class != null ? _dequanto_src_utils__class : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$class = void 0;
var $class;
(function ($class) {
    function curry(entity, extend) {
        let cloned = Object.assign({}, entity, extend);
        let proto = Object.getPrototypeOf(entity);
        Object.setPrototypeOf(cloned, proto);
        return cloned;
    }
    $class.curry = curry;
})($class = exports.$class || (exports.$class = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__class === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__class) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__class, module.exports);
    } else {
        _dequanto_src_utils__class = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_env_BigIntSerializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_env_BigIntSerializer != null ? _dequanto_src_env_BigIntSerializer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntSerializer = void 0;
const _buffer_1 = _dequanto_src_utils__buffer;
BigInt.prototype.toJSON = function () { return this.toString(); };
BigInt.prototype.toBuffer = function () {
    let hex = this.toString(16);
    if (hex.length % 2 !== 0) {
        hex = `0${hex}`;
    }
    return _buffer_1.$buffer.fromHex(hex);
};
BigInt.prototype.valueOf = function () {
    if (this > BigInt(Number.MAX_VALUE)) {
        throw new Error(`BigInt to Number overfows: ${this}`);
    }
    return Number(this);
};
function BigIntSerializer() { }
exports.BigIntSerializer = BigIntSerializer;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_env_BigIntSerializer === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_env_BigIntSerializer) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_env_BigIntSerializer, module.exports);
    } else {
        _dequanto_src_env_BigIntSerializer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__sign;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__sign != null ? _dequanto_src_utils__sign : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sign = void 0;
const _buffer_1 = _dequanto_src_utils__buffer;
const _is_1 = _dequanto_src_utils__is;
const ethers_1 = require("ethers");
var $sign;
(function ($sign) {
    /** Adds  "Ethereum Signed Message" */
    async function signEIPHashed(client, message, account, accountPss) {
        const web3 = await client.getWeb3();
        //const buffer = toBuffer(message);
        //const hash = hashPersonalMessage(buffer as Buffer);
        const str = message;
        const key = account.key != null
            ? account.key
            : null;
        if (key != null) {
            let sig = web3.eth.accounts.sign(str, key);
            let r = sig.r.substring(2);
            let s = sig.s.substring(2);
            let v = sig.v.substring(2);
            return toSignature({ r, s, v });
        }
        let signature = accountPss == null
            ? await web3.eth.sign(message.toString(), account.address)
            : await web3.eth.personal.sign(message.toString(), account.address, accountPss);
        return toSignature(splitSignature(signature));
    }
    $sign.signEIPHashed = signEIPHashed;
    async function signTx(client, tx, account, accountPss) {
        const web3 = await client.getWeb3();
        const key = account.key != null
            ? account.key
            : null;
        if (key != null) {
            let sig = await web3.eth.accounts.signTransaction(tx, key);
            return toSignature(sig);
        }
        let signed = accountPss == null
            ? await web3.eth.signTransaction(tx)
            : await web3.eth.personal.signTransaction(tx, accountPss);
        return toSignature(signed.tx);
    }
    $sign.signTx = signTx;
    async function serializeTx(tx, signature) {
        let sig = getSignature(signature);
        if (Number(sig.v) === 0) {
            // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
            sig.v = '0x25';
        }
        return ethers_1.ethers.utils.serializeTransaction(tx, {
            ...sig,
            v: Number(sig.v)
        });
    }
    $sign.serializeTx = serializeTx;
    async function recoverTx(client, tx, signature) {
        const web3 = await client.getWeb3();
        const sig = getSignature(signature);
        const rawTransaction = await serializeTx(tx, sig);
        return web3.eth.accounts.recoverTransaction(rawTransaction);
    }
    $sign.recoverTx = recoverTx;
    function splitSignature(signature) {
        let r = signature.substring(2, 2 + 64);
        let s = signature.substring(2 + 64, 2 + 64 + 64);
        let v = signature.substring(2 + 64 + 64);
        return { r, s, v };
    }
    function toSignature(sign) {
        let { r, s, v } = sign;
        r = remove0x(r);
        s = remove0x(s);
        if (typeof v === 'number') {
            v = v.toString(16);
        }
        v = remove0x(v);
        return {
            v: `0x${v}`,
            r: `0x${r}`,
            s: `0x${s}`,
            signature: `0x${r}${s}${v}`,
            signatureVRS: `0x${v}${r}${s}`
        };
    }
    function remove0x(hex) {
        return hex.startsWith('0x') ? hex.substring(2) : hex;
    }
    function toBuffer(message, opts) {
        if (typeof message === 'string') {
            let encoding = opts?.encoding;
            if (encoding == null && _is_1.$is.hexString(message)) {
                encoding = 'hex';
                message = message.substring(2);
            }
            if (encoding === 'hex') {
                return _buffer_1.$buffer.fromHex(message);
            }
            return _buffer_1.$buffer.fromString(message, opts?.encoding ?? 'utf8');
        }
        return message;
    }
    function getSignature(signature) {
        let sig = typeof signature === 'string'
            ? splitSignature(signature)
            : signature;
        if (sig?.r == null || sig?.v == null || sig?.s == null) {
            throw new Error(`Invalid signature ${JSON.stringify(sig)}`);
        }
        return sig;
    }
})($sign = exports.$sign || (exports.$sign = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__sign === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__sign) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__sign, module.exports);
    } else {
        _dequanto_src_utils__sign = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__account;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__account != null ? _dequanto_src_utils__account : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$account = void 0;
const _address_1 = _dequanto_src_utils__address;
var $account;
(function ($account) {
    function getSender(account) {
        if (typeof account === 'string') {
            if (_address_1.$address.isValid(account)) {
                return { address: account };
            }
            return { name: account };
        }
        let acc = isSafe(account)
            ? account.operator
            : account;
        return acc;
    }
    $account.getSender = getSender;
    function isSafe(account) {
        if (account == null) {
            return false;
        }
        if (typeof account === 'string') {
            return /^safe\//.test(account);
        }
        return 'operator' in account;
    }
    $account.isSafe = isSafe;
})($account = exports.$account || (exports.$account = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__account === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__account) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__account, module.exports);
    } else {
        _dequanto_src_utils__account = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__gas;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__gas != null ? _dequanto_src_utils__gas : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$gas = void 0;
const _bigint_1 = _dequanto_src_utils__bigint;
var $gas;
(function ($gas) {
    function formatUsed(txData, receipt) {
        let usage = receipt.gasUsed;
        let price = BigInt(receipt.effectiveGasPrice ?? txData.gasPrice ?? 1);
        let priceGwei = _bigint_1.$bigint.toGweiFromWei(price);
        let totalEth = _bigint_1.$bigint.toEther(BigInt(usage) * price);
        return `${totalEth}ETH(${usage}gas × ${priceGwei}gwei)`;
    }
    $gas.formatUsed = formatUsed;
})($gas = exports.$gas || (exports.$gas = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__gas === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__gas) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__gas, module.exports);
    } else {
        _dequanto_src_utils__gas = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_TxDataBuilder;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_TxDataBuilder != null ? _dequanto_src_txs_TxDataBuilder : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxDataBuilder = void 0;
const InputDataUtils_1 = _dequanto_src_contracts_utils_InputDataUtils;
const _account_1 = _dequanto_src_utils__account;
const _bigint_1 = _dequanto_src_utils__bigint;
const atma_io_1 = require("atma-io");
class TxDataBuilder {
    constructor(client, account, data, config = null) {
        this.client = client;
        this.account = account;
        this.data = data;
        this.config = config;
        this.data ?? (this.data = {});
        this.data.value = this.data.value ?? 0;
        this.data.chainId = client.chainId;
    }
    setInputDataWithTypes(types, paramaters) {
        this.data.data = InputDataUtils_1.InputDataUtils.encodeWithTypes(this.client, types, paramaters);
        return this;
    }
    setInputDataWithABI(IFunctionABI, ...params) {
        try {
            this.data.data = InputDataUtils_1.InputDataUtils.encodeWithABI(IFunctionABI, ...params);
        }
        catch (error) {
            error.message = `${JSON.stringify(IFunctionABI)}\n${error.message}`;
            throw error;
        }
        return this;
    }
    setValue(value) {
        if (value == null) {
            return this;
        }
        if (typeof value === 'number') {
            value = _bigint_1.$bigint.toWei(value);
        }
        if (typeof value === 'bigint') {
            this.data.value = `0x${value.toString(16)}`;
            return this;
        }
        this.data.value = value;
        return this;
    }
    setConfig(config) {
        this.config = config;
        return this;
    }
    async setNonce(opts) {
        let nonce;
        if (opts?.nonce != null) {
            nonce = opts.nonce;
        }
        else if (opts?.overriding) {
            nonce = await this.client.getTransactionCount(this.account.address);
            // override first pending TX:
        }
        else if (opts?.noncePending != null) {
            let pendingIndex = opts.noncePending - 1;
            let submited = await this.client.getTransactionCount(this.account.address);
            let next = pendingIndex;
            if (next > 0) {
                let total = await this.client.getTransactionCount(this.account.address, 'pending');
                let pendingCount = total - submited;
                if (pendingCount > 0 && next > pendingCount - 1) {
                    next = pendingCount - 1;
                }
            }
            nonce = submited + next;
        }
        else {
            nonce = await this.client.getTransactionCount(this.account.address, 'pending');
        }
        this.data.nonce = nonce;
    }
    async setGas({ price, priceRatio, gasLimitRatio, gasLimit, gasEstimation, from, type, } = {}) {
        let [gasPrice, gasUsage] = await Promise.all([
            price != null ?
                { price, base: price, priority: 10n ** 9n }
                : this.client.getGasPrice(),
            gasEstimation
                ? this.client.getGasEstimation(from ?? this.account.address, this.data)
                : (gasLimit ?? this.client.defaultGasLimit ?? 2000000)
        ]);
        let hasPriceRatio = priceRatio != null;
        let hasPriceFixed = price != null;
        let $priceRatio = 1;
        if (hasPriceRatio) {
            $priceRatio = priceRatio;
        }
        else if (hasPriceFixed === false) {
            $priceRatio = 1.4;
        }
        type ?? (type = this.client.defaultTxType);
        if (type === 1) {
            let $baseFee = _bigint_1.$bigint.multWithFloat(gasPrice.price, $priceRatio);
            this.data.gasPrice = _bigint_1.$bigint.toHex($baseFee);
        }
        else {
            let $baseFee = _bigint_1.$bigint.multWithFloat(gasPrice.base ?? gasPrice.price, $priceRatio);
            let $priorityFee = gasPrice.priority ?? 10n ** 9n;
            this.data.maxFeePerGas = _bigint_1.$bigint.toHex($baseFee + $priorityFee);
            this.data.maxPriorityFeePerGas = _bigint_1.$bigint.toHex($priorityFee);
            this.data.type = 2;
        }
        let hasLimitRatio = gasLimitRatio != null;
        let hasLimitFixed = gasLimit != null;
        let $gasLimitRatio = 1;
        if (hasLimitRatio) {
            $gasLimitRatio = gasLimitRatio;
        }
        else if (hasLimitFixed === false) {
            $gasLimitRatio = 1.5;
        }
        this.data.gasLimit = gasLimit ?? Math.floor(Number(gasUsage) * $gasLimitRatio);
        return this;
    }
    increaseGas(ratio) {
        let { gasPrice, maxFeePerGas } = this.data;
        if (gasPrice != null) {
            let price = BigInt(gasPrice);
            let priceNew = _bigint_1.$bigint.multWithFloat(price, ratio);
            this.data.gasPrice = _bigint_1.$bigint.toHex(priceNew);
            return;
        }
        if (maxFeePerGas != null) {
            let price = BigInt(maxFeePerGas);
            let priceNew = _bigint_1.$bigint.multWithFloat(price, ratio);
            this.data.maxFeePerGas = _bigint_1.$bigint.toHex(priceNew);
            return;
        }
        throw new Error(`Not possible to increase the gas price, the price not set yet`);
    }
    getTxData(client) {
        return {
            ...this.data,
            from: this.account?.address ?? void 0,
            chainId: this.data.chainId ?? client?.chainId ?? this.client?.chainId,
        };
    }
    /** Returns base64 string of the Tx Data */
    async signToString(privateKey) {
        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.substring(2);
        }
        return this.client.sign(this.data, privateKey);
    }
    toJSON() {
        return {
            account: {
                address: this.account?.address,
            },
            tx: this.data,
            config: this.config,
        };
    }
    async save(path, additionalProperties) {
        let json = this.toJSON();
        await atma_io_1.File.writeAsync(path, {
            ...json,
            ...(additionalProperties ?? {})
        });
    }
    static fromJSON(client, account, json) {
        let sender = _account_1.$account.getSender(account);
        return new TxDataBuilder(client, sender, json.tx, json.config);
    }
    static normalize(data) {
        for (let key in data) {
            let v = data[key];
            if (typeof v === 'string' && /^\d+$/.test(v)) {
                data[key] = BigInt(v);
            }
        }
        return data;
    }
    static getGasPrice(builder) {
        let { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = builder.data;
        if (gasPrice != null) {
            return BigInt(gasPrice);
        }
        if (maxFeePerGas != null) {
            return BigInt(maxFeePerGas) + BigInt(maxPriorityFeePerGas ?? 0);
        }
        return null;
    }
}
exports.TxDataBuilder = TxDataBuilder;
TxDataBuilder.nonce = -1;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_TxDataBuilder === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_TxDataBuilder) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_TxDataBuilder, module.exports);
    } else {
        _dequanto_src_txs_TxDataBuilder = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_TxLogger;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_TxLogger != null ? _dequanto_src_txs_TxLogger : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxLogger = void 0;
const _logger_1 = _dequanto_src_utils__logger;
const everlog_1 = require("everlog");
class TxLogger {
    constructor(id, from, builder) {
        this.id = id;
        this.from = from;
        this.builder = builder;
    }
    log(message) {
        _logger_1.$logger.log('TxLog:', message);
        channels.log.writeRow([
            new Date(),
            'LOG',
            this.id,
            message
        ]);
    }
    logStart() {
        channels.start.writeRow([
            new Date(),
            this.id,
            this.from,
            this.builder.data.to,
            this.builder.data.data?.toString()
        ]);
    }
    logReceipt(receipt, time) {
        channels.receipt.writeRow([
            new Date(),
            this.id,
            receipt.transactionHash,
            receipt.status,
            time,
        ]);
    }
    logError(error) {
        _logger_1.$logger.log('TxError:', error.message);
        channels.log.writeRow([
            new Date(),
            'ERROR',
            this.id,
            error.message
        ]);
    }
}
exports.TxLogger = TxLogger;
const channels = {
    start: everlog_1.Everlog.createChannel('tx-starts', {
        columns: [
            {
                type: 'date',
                name: 'Date'
            },
            {
                type: 'string',
                name: 'ID'
            },
            {
                type: 'string',
                name: 'From'
            },
            {
                type: 'string',
                name: 'To'
            },
            {
                type: 'string',
                name: 'Method'
            }
        ]
    }),
    log: everlog_1.Everlog.createChannel('tx-logs', {
        columns: [
            {
                type: 'date',
                name: 'Date'
            },
            {
                type: 'string',
                name: 'Level'
            },
            {
                type: 'string',
                name: 'TxID'
            },
            {
                type: 'string',
                name: 'Error'
            }
        ]
    }),
    receipt: everlog_1.Everlog.createChannel('tx-receipts', {
        columns: [
            {
                type: 'date',
                name: 'Date'
            },
            {
                type: 'string',
                name: 'ID'
            },
            {
                type: 'string',
                name: 'TxHash'
            },
            {
                type: 'string',
                name: 'Status'
            },
            {
                type: 'number',
                name: 'Duration'
            }
        ]
    }),
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_TxLogger === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_TxLogger) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_TxLogger, module.exports);
    } else {
        _dequanto_src_txs_TxLogger = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_ATokenProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_ATokenProvider != null ? _dequanto_src_tokens_TokenProviders_ATokenProvider : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATokenProvider = void 0;
const _address_1 = _dequanto_src_utils__address;
class ATokenProvider {
    async getByAddress(platform, address) {
        let tokens = await this.getTokens();
        let global = tokens.find(x => x.platforms?.some(y => y.platform === platform && _address_1.$address.eq(y.address, address)));
        if (global == null) {
            return null;
        }
        let p = global.platforms.find(x => x.platform === platform);
        return {
            symbol: global.symbol,
            name: global.name,
            platform: platform,
            address: p.address,
            decimals: p.decimals,
        };
    }
    async getBySymbol(platform, symbol) {
        let tokens = await this.getTokens();
        symbol = symbol.toLowerCase();
        let global = tokens.find(x => x.symbol.toLowerCase() === symbol && x.platforms?.some(y => y.platform === platform));
        if (global == null) {
            return null;
        }
        let p = global.platforms.find(x => x.platform === platform);
        return {
            symbol: global.symbol,
            name: global.name,
            platform: platform,
            address: p.address,
            decimals: p.decimals,
        };
    }
}
exports.ATokenProvider = ATokenProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_ATokenProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_ATokenProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_ATokenProvider, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_ATokenProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_arbitrum_ArbTokenProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_arbitrum_ArbTokenProvider != null ? _dequanto_src_chains_arbitrum_ArbTokenProvider : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbTokenProvider = void 0;
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const ATokenProvider_1 = _dequanto_src_tokens_TokenProviders_ATokenProvider;
const _path_1 = _dequanto_src_utils__path;
const axios_1 = __importDefault(require("axios"));
class ArbTokenProvider extends ATokenProvider_1.ATokenProvider {
    constructor() {
        super(...arguments);
        this.store = new JsonArrayStore_1.JsonArrayStore({
            path: _path_1.$path.resolve('/data/tokens/arbitrum.json'),
            key: x => x.symbol
        });
    }
    getTokens() {
        return this.store.getAll();
    }
    async redownloadTokens() {
        let { data: json } = await axios_1.default.get(`https://bridge.arbitrum.io/token-list-42161.json`);
        let tokens = json.tokens.map(token => {
            return {
                symbol: token.symbol,
                name: token.name,
                logo: token.logoURI,
                platforms: [{
                        platform: 'arbitrum',
                        address: token.address,
                        decimals: token.decimals
                    }]
            };
        });
        await this.store.saveAll(tokens);
        return tokens;
    }
}
exports.ArbTokenProvider = ArbTokenProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_arbitrum_ArbTokenProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_arbitrum_ArbTokenProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_arbitrum_ArbTokenProvider, module.exports);
    } else {
        _dequanto_src_chains_arbitrum_ArbTokenProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPExplorer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPExplorer != null ? _dequanto_src_tokens_TokenProviders_TPExplorer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPExplorer = void 0;
class TPExplorer {
    constructor(platform, explorer) {
        this.platform = platform;
        this.explorer = explorer;
    }
    async getByAddress(platform, address) {
        if (this.platform !== platform) {
            return null;
        }
        try {
            let source = await this.explorer?.getContractSource(address);
            return {
                address: address,
                symbol: source
                    .ContractName
                    ?.replace(/bep20/i, ''),
            };
        }
        catch (error) {
            // just ignore if not resolved
            return null;
        }
    }
    getBySymbol(platform, symbol) {
        // Does not support by name
        return null;
    }
    async redownloadTokens() {
        return [];
    }
}
exports.TPExplorer = TPExplorer;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPExplorer === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPExplorer) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPExplorer, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPExplorer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPCoinmarketcap;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPCoinmarketcap != null ? _dequanto_src_tokens_TokenProviders_TPCoinmarketcap : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPCoinmarketcap = void 0;
const axios_1 = __importDefault(require("axios"));
const atma_utils_1 = require("atma-utils");
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const _config_1 = _dequanto_src_utils__config;
const ATokenProvider_1 = _dequanto_src_tokens_TokenProviders_ATokenProvider;
const coinmarketcap = _config_1.$config.get('coinmarketcap');
const tokensStore = new JsonArrayStore_1.JsonArrayStore({
    path: atma_utils_1.class_Uri.combine(coinmarketcap?.cache ?? './data/tokens/coinmarketcap/', 'tokens.json'),
    key: (x) => x.symbol
});
const HOST = `https://pro-api.coinmarketcap.com/`;
class TPCoinmarketcap extends ATokenProvider_1.ATokenProvider {
    getTokens() {
        return tokensStore.getAll();
    }
    async redownloadTokens() {
        if (coinmarketcap == null) {
            console.warn(`No ApiKey for coinmarketcap found. Skipping this token provider`);
            return [];
        }
        let url = atma_utils_1.class_Uri.combine(HOST, `/v1/cryptocurrency/map?CMC_PRO_API_KEY=${coinmarketcap.key}`);
        let resp = await axios_1.default.get(url);
        let tokens = resp.data.data;
        let arr = tokens.map(token => {
            if (token.platform == null) {
                return null;
            }
            let platform;
            switch (token.platform.name) {
                case "Binance Smart Chain":
                    platform = "bsc";
                    break;
                case "Ethereum":
                    platform = "eth";
                    break;
                case "Polygon":
                    platform = "polygon";
                    break;
                case "xDai":
                    platform = "xdai";
                    break;
                default:
                    return null;
            }
            return {
                symbol: token.symbol,
                name: token.name,
                platforms: [{
                        platform,
                        address: token.platform.token_address
                    }]
            };
        }).filter(Boolean);
        await tokensStore.saveAll(arr);
    }
}
exports.TPCoinmarketcap = TPCoinmarketcap;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPCoinmarketcap === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPCoinmarketcap) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPCoinmarketcap, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPCoinmarketcap = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_utils_TokenUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_utils_TokenUtils != null ? _dequanto_src_tokens_utils_TokenUtils : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtils = void 0;
const _bigint_1 = _dequanto_src_utils__bigint;
const _number_1 = _dequanto_src_utils__number;
const alot_1 = __importDefault(require("alot"));
var TokenUtils;
(function (TokenUtils) {
    function isStable(symbol) {
        return /^[tb]?usd[tc]?$/i.test(symbol) || /^(dai)$/i.test(symbol);
    }
    TokenUtils.isStable = isStable;
    function calcUsdIfStable(amount, token) {
        if (isStable(token.symbol) === false) {
            return null;
        }
        let tokenBase = 10n ** BigInt(token.decimals);
        return _bigint_1.$bigint.divToFloat(amount, tokenBase, 10n ** 8n);
    }
    TokenUtils.calcUsdIfStable = calcUsdIfStable;
    function calcPrice(amount, token, usd) {
        if (usd == null) {
            return null;
        }
        let tokenBase = 10n ** BigInt(token.decimals);
        let tokenAmount = _bigint_1.$bigint.divToFloat(amount, tokenBase, 10n ** 8n);
        return _number_1.$number.div(usd, tokenAmount);
    }
    TokenUtils.calcPrice = calcPrice;
    function calcTotal(token, amount, price) {
        if (price == null) {
            return null;
        }
        let tokenBase = 10n ** BigInt(token.decimals);
        let tokenAmount = _bigint_1.$bigint.divToFloat(amount, tokenBase, 10n ** 8n);
        return tokenAmount * price;
    }
    TokenUtils.calcTotal = calcTotal;
    function merge(...tokens) {
        let all = (0, alot_1.default)(tokens)
            .mapMany(arr => arr)
            .groupBy(x => x.symbol)
            .map(group => {
            let logo = group.values.find(x => x.logo)?.logo;
            let token = group.values[0];
            return {
                symbol: token.symbol,
                name: token.name,
                logo: logo,
                platforms: group.values.map(t => {
                    return {
                        address: t.address,
                        decimals: t.decimals,
                        platform: t.platform,
                    };
                })
            };
        })
            .toArray();
        return all;
    }
    TokenUtils.merge = merge;
})(TokenUtils = exports.TokenUtils || (exports.TokenUtils = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_utils_TokenUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_utils_TokenUtils) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_utils_TokenUtils, module.exports);
    } else {
        _dequanto_src_tokens_utils_TokenUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPOneInch;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPOneInch != null ? _dequanto_src_tokens_TokenProviders_TPOneInch : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPOneInch = void 0;
const axios_1 = __importDefault(require("axios"));
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const TokenUtils_1 = _dequanto_src_tokens_utils_TokenUtils;
const ATokenProvider_1 = _dequanto_src_tokens_TokenProviders_ATokenProvider;
const _path_1 = _dequanto_src_utils__path;
class TPOneInch extends ATokenProvider_1.ATokenProvider {
    constructor() {
        super(...arguments);
        this.store = new JsonArrayStore_1.JsonArrayStore({
            path: _path_1.$path.resolve('/data/tokens/1inch.json'),
            key: x => x.symbol,
            format: true,
        });
    }
    getTokens() {
        return this.store.getAll();
    }
    async redownloadTokens() {
        let tokensByPlatform = await Promise.all([
            this.downloadForPlatform('eth'),
            this.downloadForPlatform('bsc'),
            this.downloadForPlatform('polygon'),
        ]);
        let globals = TokenUtils_1.TokenUtils.merge(...tokensByPlatform);
        await this.store.saveAll(globals);
        return globals;
    }
    async downloadForPlatform(platform) {
        let url;
        switch (platform) {
            case 'eth':
                url = `https://api.1inch.exchange/v3.0/1/tokens`;
                break;
            case 'bsc':
                url = `https://api.1inch.exchange/v3.0/56/tokens`;
                break;
            case 'polygon':
                url = `https://api.1inch.exchange/v3.0/137/tokens`;
                break;
            default:
                throw new Error(`Invalid Platform ${platform}`);
        }
        let resp = await axios_1.default.get(url);
        let hash = resp.data.tokens;
        let arr = Object.keys(hash).map(key => {
            let t = hash[key];
            return {
                symbol: t.symbol,
                name: t.name,
                decimals: t.decimals,
                logo: t.logoURI,
                platform: platform,
                address: t.address,
            };
        });
        return arr;
    }
}
exports.TPOneInch = TPOneInch;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPOneInch === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPOneInch) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPOneInch, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPOneInch = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPSushiswap;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPSushiswap != null ? _dequanto_src_tokens_TokenProviders_TPSushiswap : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPSushiswap = void 0;
const axios_1 = __importDefault(require("axios"));
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const TokenUtils_1 = _dequanto_src_tokens_utils_TokenUtils;
const ATokenProvider_1 = _dequanto_src_tokens_TokenProviders_ATokenProvider;
const _path_1 = _dequanto_src_utils__path;
class TPSushiswap extends ATokenProvider_1.ATokenProvider {
    constructor() {
        super(...arguments);
        this.store = new JsonArrayStore_1.JsonArrayStore({
            path: _path_1.$path.resolve('/data/tokens/sushi.json'),
            key: x => x.symbol,
            format: true,
        });
    }
    getTokens() {
        return this.store.getAll();
    }
    /** Finds remote  */
    async find(address) {
        throw new Error('Not implemented');
    }
    async redownloadTokens() {
        let tokensByPlatform = await Promise.all([
            this.downloadForPlatform('eth'),
            this.downloadForPlatform('polygon'),
            this.downloadForPlatform('xdai'),
        ]);
        let globals = TokenUtils_1.TokenUtils.merge(...tokensByPlatform);
        await this.store.saveAll(globals);
        return globals;
    }
    async downloadForPlatform(platform) {
        let url;
        let mapper;
        function mapperApi(resp) {
            let arr = resp.data[1];
            return arr.map(t => {
                return {
                    symbol: t.Symbol,
                    name: t.Name,
                    decimals: t.Decimals,
                    platform: platform,
                    address: t.Contract,
                };
            });
        }
        function mapperGithub(resp) {
            let arr = resp.data;
            return arr.map(t => {
                return {
                    symbol: t.symbol,
                    name: t.name,
                    decimals: t.decimals,
                    platform: platform,
                    address: t.address,
                };
            });
        }
        switch (platform) {
            case 'eth':
                url = `https://api2.sushipro.io/?action=all_tokens&chainID=1`;
                mapper = mapperApi;
                break;
            case 'bsc':
                throw new Error(`Bsc is not supported by sushiswap api`);
                break;
            case 'polygon':
                url = `https://api2.sushipro.io/?action=all_tokens&chainID=137`;
                mapper = mapperApi;
                break;
            case 'xdai':
                url = `https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/xdai.json`;
                mapper = mapperGithub;
                break;
            default:
                throw new Error(`Invalid Platform ${platform}`);
        }
        let resp = await axios_1.default.get(url);
        let tokens = mapper(resp);
        return tokens;
    }
}
exports.TPSushiswap = TPSushiswap;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPSushiswap === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPSushiswap) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPSushiswap, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPSushiswap = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPConfig;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPConfig != null ? _dequanto_src_tokens_TokenProviders_TPConfig : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPConfig = void 0;
const ATokenProvider_1 = _dequanto_src_tokens_TokenProviders_ATokenProvider;
const Config_1 = _dequanto_src_Config;
const _require_1 = _dequanto_src_utils__require;
class TPConfig extends ATokenProvider_1.ATokenProvider {
    async getTokens() {
        return Config_1.config.tokens ?? [];
    }
    async addToken(token) {
        _require_1.$require.Address(token.address);
        _require_1.$require.Number(token.decimals);
        _require_1.$require.notNull(token.platform, 'Not possible to add the token - platform is undefined');
        let tokens = await this.getTokens();
        let current = tokens.find(t => t.symbol === token.symbol);
        if (current == null) {
            current = {
                symbol: token.symbol,
                platforms: []
            };
            tokens.push(current);
        }
        if (current.platforms == null) {
            current.platforms = [];
        }
        let currentPlatform = current.platforms.find(x => x.platform == token.platform);
        if (currentPlatform == null) {
            current.platforms.push({
                platform: token.platform,
                decimals: token.decimals,
                address: token.address,
            });
        }
        else {
            currentPlatform.decimals = token.decimals;
            currentPlatform.address = token.address;
        }
        await Config_1.Config.extend({
            tokens
        });
    }
    async redownloadTokens() {
    }
}
exports.TPConfig = TPConfig;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPConfig === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPConfig) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPConfig, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPConfig = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenProviders_TPChain;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenProviders_TPChain != null ? _dequanto_src_tokens_TokenProviders_TPChain : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPChain = void 0;
const ContractReader_1 = _dequanto_src_contracts_ContractReader;
class TPChain {
    constructor(platform, client) {
        this.platform = platform;
        this.client = client;
    }
    async getByAddress(platform, address) {
        if (this.platform !== platform) {
            return null;
        }
        let reader = new ContractReader_1.ContractReader(this.client);
        try {
            let [symbol, name, decimals,] = await Promise.all([
                reader.readAsync(address, 'function symbol() returns string'),
                reader.readAsync(address, 'function name() returns string'),
                reader.readAsync(address, 'function decimals() returns uint8'),
            ]);
            return {
                platform,
                address,
                symbol,
                name,
                decimals,
            };
        }
        catch (error) {
            // just ignore if not resolved
            return null;
        }
    }
    getBySymbol(platform, symbol) {
        // Does not support by name
        return null;
    }
    async redownloadTokens() {
        return [];
    }
}
exports.TPChain = TPChain;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenProviders_TPChain === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenProviders_TPChain) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenProviders_TPChain, module.exports);
    } else {
        _dequanto_src_tokens_TokenProviders_TPChain = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenDataProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenDataProvider != null ? _dequanto_src_tokens_TokenDataProvider : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDataProvider = void 0;
const alot_1 = __importDefault(require("alot"));
const memd_1 = __importDefault(require("memd"));
const ArbTokenProvider_1 = _dequanto_src_chains_arbitrum_ArbTokenProvider;
const _address_1 = _dequanto_src_utils__address;
const _is_1 = _dequanto_src_utils__is;
const _require_1 = _dequanto_src_utils__require;
const TPExplorer_1 = _dequanto_src_tokens_TokenProviders_TPExplorer;
const TPCoinmarketcap_1 = _dequanto_src_tokens_TokenProviders_TPCoinmarketcap;
const TPOneInch_1 = _dequanto_src_tokens_TokenProviders_TPOneInch;
const TPSushiswap_1 = _dequanto_src_tokens_TokenProviders_TPSushiswap;
const TPConfig_1 = _dequanto_src_tokens_TokenProviders_TPConfig;
const TPChain_1 = _dequanto_src_tokens_TokenProviders_TPChain;
class TokenDataProvider {
    constructor(platform, explorer, client) {
        this.platform = platform;
        this.explorer = explorer;
        this.client = client;
        this.config = new TPConfig_1.TPConfig();
        this.providers = [
            this.config,
            new TPOneInch_1.TPOneInch(),
            new TPSushiswap_1.TPSushiswap(),
            // @TODO uniswap thegraph api doesn't work any more
            // new TPUniswap(),
            new TPCoinmarketcap_1.TPCoinmarketcap(),
            new ArbTokenProvider_1.ArbTokenProvider(),
            new TPExplorer_1.TPExplorer(this.platform, this.explorer),
            new TPChain_1.TPChain(this.platform, this.client),
        ];
    }
    async getTokenOrDefault(address, chainLookup = true) {
        return await this.getToken(address, chainLookup) ?? this.default(address);
    }
    async getToken(mix, chainLookup = true) {
        let [token, provider] = _is_1.$is.Address(mix)
            ? await this.getTokenByAddress(mix, chainLookup)
            : await this.getTokenBySymbol(mix, chainLookup);
        return token;
    }
    async getKnownToken(mix) {
        let [token, provider] = _is_1.$is.Address(mix)
            ? await this.getTokenByAddress(mix, false)
            : await this.getTokenBySymbol(mix, false);
        if (token == null) {
            throw new Error(`Token ${mix} not found`);
        }
        return token;
    }
    /**
     *  Adds and saves the token to dequanto configuration.
     */
    async addKnownToken(token) {
        await this.config.addToken(token);
    }
    isNative(mix) {
        _require_1.$require.notNull(mix, `Token is undefined`);
        if (typeof mix === 'object') {
            return this.isNative(mix.symbol ?? mix.address);
        }
        if (_is_1.$is.Address(mix)) {
            return NativeTokens.isNativeByAddress(mix);
        }
        return NativeTokens.isNativeBySymbol(this.platform, mix);
    }
    getNative(platform) {
        return NativeTokens.getNative(platform);
    }
    /** Download tokens with various exchange/swap providers and merge them into one collection. */
    async redownload() {
        return await (0, alot_1.default)(this.providers)
            .forEachAsync(async (x, i) => {
            console.log(`Get from #${i} Provider`);
            await x.redownloadTokens();
            console.log(`Get from #${i} Provider DONE`);
        })
            .toArrayAsync();
    }
    async getTokenByAddress(address, chainLookup = true) {
        let [token, provider] = await (0, alot_1.default)(this.providers)
            .mapAsync(async (provider) => {
            if (provider instanceof TPExplorer_1.TPExplorer && chainLookup === false) {
                return [null, null];
                ;
            }
            return [await provider.getByAddress(this.platform, address), provider];
        })
            .firstAsync(([token]) => token != null) ?? [];
        if (!token?.symbol && NativeTokens.isNativeByAddress(address)) {
            token = NativeTokens.getNative(this.platform);
        }
        return [token, provider];
    }
    async getTokenBySymbol(symbol, chainLookup = true) {
        let [token, provider] = await (0, alot_1.default)(this.providers)
            .mapAsync(async (provider) => {
            if (provider instanceof TPExplorer_1.TPExplorer && chainLookup === false) {
                return [null, null];
            }
            return [await provider.getBySymbol(this.platform, symbol), provider];
        })
            .firstAsync(([token]) => token != null) ?? [];
        if (!token?.symbol && NativeTokens.isNativeBySymbol(this.platform, symbol)) {
            token = NativeTokens.getNative(this.platform);
        }
        return [token, provider];
    }
    default(address) {
        return {
            platform: this.platform,
            symbol: address,
            name: address,
            address: address,
            decimals: 18,
        };
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], TokenDataProvider.prototype, "getToken", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], TokenDataProvider.prototype, "getKnownToken", null);
exports.TokenDataProvider = TokenDataProvider;
var NativeTokens;
(function (NativeTokens) {
    const T1 = `0x0000000000000000000000000000000000000000`;
    const T2 = `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`;
    const tokens = {
        'ETH': {
            name: 'Ethereum Native Token',
            symbol: 'ETH',
            decimals: 18,
            icon: null,
            platform: 'eth',
            address: T2,
        },
        'BNB': {
            name: 'BSC Native Token',
            symbol: 'BNB',
            decimals: 18,
            icon: null,
            platform: 'bsc',
            address: T1,
        },
        'MATIC': {
            name: 'Polygon Native Token',
            symbol: 'MATIC',
            decimals: 18,
            icon: null,
            platform: 'polygon',
            address: T2,
        },
        'XDAI': {
            name: 'xDai Native Token',
            symbol: 'XDAI',
            decimals: 18,
            icon: null,
            platform: 'xdai',
            address: T1,
            aliases: ['DAI']
        },
    };
    const PLATFORMS = {
        'eth': 'ETH',
        'hardhat': 'ETH',
        'bsc': 'BNB',
        'polygon': 'MATIC',
        'xdai': 'xDAI',
        'arbitrum': 'ETH',
    };
    const PLATFORM_ALIASES = {
        ['xdai']: {
            aliases: ['DAI']
        }
    };
    function isNativeBySymbol(platform, symbol) {
        if (symbol == null) {
            return false;
        }
        symbol = symbol.toUpperCase();
        if (symbol in tokens) {
            return true;
        }
        let byPlatform = PLATFORM_ALIASES[platform];
        if (byPlatform?.aliases?.includes(symbol)) {
            return true;
        }
        return false;
    }
    NativeTokens.isNativeBySymbol = isNativeBySymbol;
    function isNativeByAddress(address) {
        const check = address.toLowerCase();
        return _address_1.$address.eq(T1, check) || _address_1.$address.eq(T2, check);
    }
    NativeTokens.isNativeByAddress = isNativeByAddress;
    function toNativeByAddress(platform, address) {
        const token = tokens[platform?.toUpperCase()];
        return {
            ...token,
            address: address
        };
    }
    NativeTokens.toNativeByAddress = toNativeByAddress;
    function getNative(platform) {
        let symbol = PLATFORMS[platform];
        if (symbol == null) {
            throw new Error(`${platform} platform is not support`);
        }
        return tokens[symbol.toUpperCase()];
    }
    NativeTokens.getNative = getNative;
})(NativeTokens || (NativeTokens = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenDataProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenDataProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenDataProvider, module.exports);
    } else {
        _dequanto_src_tokens_TokenDataProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_receipt_TxLogsTransfer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_receipt_TxLogsTransfer != null ? _dequanto_src_txs_receipt_TxLogsTransfer : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxLogsTransfer = void 0;
const alot_1 = __importDefault(require("alot"));
const TokenDataProvider_1 = _dequanto_src_tokens_TokenDataProvider;
class TxLogsTransfer {
    async extractFromWriter(writer) {
        let receipt = await writer.onCompleted;
        let knownLogs = writer.tx?.knownLogs ?? [];
        return this.extractFromParsed(knownLogs, writer.client.platform);
    }
    async extractFromParsed(knownLogs, platform) {
        let transfers = knownLogs.filter(x => x.event === 'Transfer');
        let tokenService = new TokenDataProvider_1.TokenDataProvider(platform);
        return (0, alot_1.default)(transfers).mapAsync(async (transfer) => {
            let erc20Address = transfer.address;
            let token = await tokenService.getTokenOrDefault(erc20Address);
            let [from, to, amount] = transfer.arguments;
            return {
                event: transfer.event,
                token,
                from: from.value,
                to: to.value,
                amount: amount.value
            };
        }).toArrayAsync();
    }
    // async extractFromReceipt (receipt: TransactionReceipt, platform: TPlatform): Promise<ITxLogsTransferData[]> {
    //     let parser = new TxLogParser();
    //     let logs = await parser.parse(receipt);
    //     logs = logs.filter(x => x != null);
    //     return this.extractFromParsed(logs, platform);
    // }
    async extract(transfer, platform) {
        let tokenService = new TokenDataProvider_1.TokenDataProvider(platform);
        let erc20Address = transfer.address;
        let token = await tokenService.getTokenOrDefault(erc20Address);
        let [from, to, amount] = transfer.arguments;
        return {
            event: transfer.event,
            token,
            from: from.value,
            to: to.value,
            amount: amount.value
        };
    }
}
exports.TxLogsTransfer = TxLogsTransfer;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_receipt_TxLogsTransfer === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_receipt_TxLogsTransfer) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_receipt_TxLogsTransfer, module.exports);
    } else {
        _dequanto_src_txs_receipt_TxLogsTransfer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_receipt_TxTopicInMemoryProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_receipt_TxTopicInMemoryProvider != null ? _dequanto_src_txs_receipt_TxTopicInMemoryProvider : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxTopicInMemoryProvider = void 0;
const _abiParser_1 = _dequanto_src_utils__abiParser;
const _abiUtils_1 = _dequanto_src_utils__abiUtils;
class TxTopicInMemoryProvider {
    constructor() {
        this.hash = Object.create(null);
    }
    register(mix) {
        if (mix == null) {
            return this;
        }
        if (Array.isArray(mix)) {
            mix.forEach(x => this.register(x));
            return this;
        }
        let abi;
        let formatter;
        if (typeof mix !== 'string' && 'abi' in mix && 'formatter' in mix) {
            abi = mix.abi;
            formatter = mix.formatter;
        }
        else {
            abi = mix;
        }
        if (typeof abi === 'string') {
            abi = _abiParser_1.$abiParser.parseMethod(abi);
        }
        let hash = _abiUtils_1.$abiUtils.getMethodHash(abi);
        this.hash[hash] = {
            abi,
            formatter
        };
        return this;
    }
    async get(topicHash) {
        return this.hash[topicHash];
    }
}
exports.TxTopicInMemoryProvider = TxTopicInMemoryProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_receipt_TxTopicInMemoryProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_receipt_TxTopicInMemoryProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_receipt_TxTopicInMemoryProvider, module.exports);
    } else {
        _dequanto_src_txs_receipt_TxTopicInMemoryProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_receipt_TxTopicProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_receipt_TxTopicProvider != null ? _dequanto_src_txs_receipt_TxTopicProvider : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxTopicProvider = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TxLogsTransfer_1 = _dequanto_src_txs_receipt_TxLogsTransfer;
const TxTopicInMemoryProvider_1 = _dequanto_src_txs_receipt_TxTopicInMemoryProvider;
class TxTopicProvider {
    constructor() {
        this.default = new TxTopicInMemoryProvider_1.TxTopicInMemoryProvider();
        this.register([
            //'event Transfer(address from, address to, uint256 amount)'
            {
                abi: 'event Transfer(address from, address to, uint256 amount)',
                formatter: a_di_1.default.resolve(TxLogsTransfer_1.TxLogsTransfer)
            }
        ]);
    }
    async get(topicHash) {
        return this.default.get(topicHash);
    }
    register(mix) {
        this.default.register(mix);
        return this;
    }
}
exports.TxTopicProvider = TxTopicProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_receipt_TxTopicProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_receipt_TxTopicProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_receipt_TxTopicProvider, module.exports);
    } else {
        _dequanto_src_txs_receipt_TxTopicProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_receipt_TxLogParser;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_receipt_TxLogParser != null ? _dequanto_src_txs_receipt_TxLogParser : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxLogParser = void 0;
const alot_1 = __importDefault(require("alot"));
const _contract_1 = _dequanto_src_utils__contract;
const TxTopicProvider_1 = _dequanto_src_txs_receipt_TxTopicProvider;
class TxLogParser {
    constructor(topics = new TxTopicProvider_1.TxTopicProvider()) {
        this.topics = topics;
    }
    /**
     *  Sparse arrays will contain NULLs for unparsed log items.
     *  Per default dense arrays - only with known logs - are returned
     */
    async parse(receipt, opts) {
        let logs = await (0, alot_1.default)(receipt.logs).mapAsync(async (log) => {
            let topic = await this.topics.get(log.topics[0]);
            if (topic == null) {
                return null;
            }
            let { abi, formatter } = topic;
            let parsed = _contract_1.$contract.parseLogWithAbi(log, abi);
            if (formatter) {
                return await formatter.extract(parsed, opts?.platform ?? 'eth');
            }
            return parsed;
        }).toArrayAsync();
        if (opts?.sparse !== true) {
            logs = logs.filter(x => x != null);
        }
        return logs;
    }
}
exports.TxLogParser = TxLogParser;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_receipt_TxLogParser === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_receipt_TxLogParser) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_receipt_TxLogParser, module.exports);
    } else {
        _dequanto_src_txs_receipt_TxLogParser = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__signRaw;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__signRaw != null ? _dequanto_src_utils__signRaw : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$signRaw = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const _buffer_1 = _dequanto_src_utils__buffer;
const _is_1 = _dequanto_src_utils__is;
const ethers_1 = require("ethers");
var $signRaw;
(function ($signRaw) {
    function signEC(message, privateKey) {
        const sig = (0, ethereumjs_util_1.ecsign)(toBuffer(message), toBuffer(privateKey, { encoding: 'hex' }));
        let r = sig.r.toString('hex').padStart(64, '0');
        let s = sig.s.toString('hex').padStart(64, '0');
        let v = sig.v.toString(16);
        return {
            v: `0x${v}`,
            r: `0x${r}`,
            s: `0x${s}`,
            signature: `0x${r}${s}${v}`,
            signatureVRS: `0x${v}${r}${s}`
        };
    }
    $signRaw.signEC = signEC;
    function signEIPHashed(message, privateKey) {
        const buffer = toBuffer(message);
        const hash = (0, ethereumjs_util_1.hashPersonalMessage)(buffer);
        return signEC(hash, privateKey);
    }
    $signRaw.signEIPHashed = signEIPHashed;
    function ecrecover(message, signature) {
        return ethers_1.utils.recoverAddress(message, signature);
    }
    $signRaw.ecrecover = ecrecover;
    function toBuffer(message, opts) {
        if (typeof message === 'string') {
            let encoding = opts?.encoding;
            if (encoding == null && _is_1.$is.hexString(message)) {
                encoding = 'hex';
                message = message.substring(2);
            }
            if (encoding === 'hex') {
                return _buffer_1.$buffer.fromHex(message);
            }
            return _buffer_1.$buffer.fromString(message, opts?.encoding ?? 'utf8');
        }
        return message;
    }
})($signRaw = exports.$signRaw || (exports.$signRaw = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__signRaw === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__signRaw) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__signRaw, module.exports);
    } else {
        _dequanto_src_utils__signRaw = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_utils__hex;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_utils__hex != null ? _dequanto_src_utils__hex : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$hex = void 0;
var $hex;
(function ($hex) {
    function ensure(mix) {
        if (mix.startsWith('0x')) {
            return mix;
        }
        return `0x${mix}`;
    }
    $hex.ensure = ensure;
})($hex = exports.$hex || (exports.$hex = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_utils__hex === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_utils__hex) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_utils__hex, module.exports);
    } else {
        _dequanto_src_utils__hex = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_safe__gnosis;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_safe__gnosis != null ? _dequanto_src_safe__gnosis : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$gnosis = void 0;
const safe_web3_lib_1 = __importDefault(require("@gnosis.pm/safe-web3-lib"));
const _hex_1 = _dequanto_src_utils__hex;
var $gnosis;
(function ($gnosis) {
    async function getAdapter(owner, client) {
        const web3 = await client.getWeb3();
        if (owner.key) {
            web3.eth.accounts.wallet.add(_hex_1.$hex.ensure(owner.key));
        }
        const ethAdapter = new safe_web3_lib_1.default({
            web3: web3,
            signerAddress: owner.address,
        });
        return ethAdapter;
    }
    $gnosis.getAdapter = getAdapter;
})($gnosis = exports.$gnosis || (exports.$gnosis = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_safe__gnosis === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_safe__gnosis) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_safe__gnosis, module.exports);
    } else {
        _dequanto_src_safe__gnosis = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_safe_transport_GnosisServiceTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_safe_transport_GnosisServiceTransport != null ? _dequanto_src_safe_transport_GnosisServiceTransport : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisServiceTransport = void 0;
const safe_service_client_1 = __importDefault(require("@gnosis.pm/safe-service-client"));
const memd_1 = __importDefault(require("memd"));
const _gnosis_1 = _dequanto_src_safe__gnosis;
class GnosisServiceTransport {
    constructor(client, owner) {
        this.client = client;
        this.owner = owner;
    }
    async getTx(safeTxHash) {
        let service = await this.getService();
        let resp = await service.getTransaction(safeTxHash);
        return resp;
    }
    async getTxConfirmations(safeTxHash) {
        let service = await this.getService();
        let resp = await service.getTransactionConfirmations(safeTxHash);
        return resp;
    }
    async confirmTx(safeTxHash, sig) {
        let service = await this.getService();
        let resp = await service.confirmTransaction(safeTxHash, sig.signature);
        return resp;
    }
    async getSafeInfo(safeAddress) {
        let service = await this.getService();
        let safeInfo = await service.getSafeInfo(safeAddress);
        return safeInfo;
    }
    async estimateSafeTransaction(safeAddress, safeTxEstimation) {
        let service = await this.getService();
        let safeInfo = await service.estimateSafeTransaction(safeAddress, safeTxEstimation);
        return safeInfo;
    }
    async proposeTransaction(args) {
        let service = await this.getService();
        await service.proposeTransaction(args);
    }
    async getService() {
        let adapter = await this.getAdapter();
        const safeService = new safe_service_client_1.default({
            txServiceUrl: this.getServiceApiEndpoint(Number(this.client.chainId)),
            ethAdapter: adapter
        });
        return safeService;
    }
    getServiceApiEndpoint(chainId) {
        let network = '';
        if (chainId === 100) {
            network = `xdai.`;
        }
        if (chainId === 137) {
            network = `polygon.`;
        }
        return `https://safe-transaction.${network}gnosis.io/`;
    }
    async getAdapter() {
        return _gnosis_1.$gnosis.getAdapter(this.owner, this.client);
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], GnosisServiceTransport.prototype, "getService", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], GnosisServiceTransport.prototype, "getAdapter", null);
exports.GnosisServiceTransport = GnosisServiceTransport;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_safe_transport_GnosisServiceTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_safe_transport_GnosisServiceTransport) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_safe_transport_GnosisServiceTransport, module.exports);
    } else {
        _dequanto_src_safe_transport_GnosisServiceTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_safe_GnosisSafeHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_safe_GnosisSafeHandler != null ? _dequanto_src_safe_GnosisSafeHandler : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisSafeHandler = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const memd_1 = __importDefault(require("memd"));
const alot_1 = __importDefault(require("alot"));
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const safe_core_sdk_1 = __importDefault(require("@gnosis.pm/safe-core-sdk"));
const _address_1 = _dequanto_src_utils__address;
const _signRaw_1 = _dequanto_src_utils__signRaw;
const ContractWriter_1 = _dequanto_src_contracts_ContractWriter;
const _fn_1 = _dequanto_src_utils__fn;
const _gnosis_1 = _dequanto_src_safe__gnosis;
const GnosisServiceTransport_1 = _dequanto_src_safe_transport_GnosisServiceTransport;
const _logger_1 = _dequanto_src_utils__logger;
const _bigint_1 = _dequanto_src_utils__bigint;
const ethers_1 = require("ethers");
const _contract_1 = _dequanto_src_utils__contract;
class GnosisSafeHandler {
    constructor(config) {
        this.safeAddress = config.safeAddress;
        this.owner = config.owner;
        this.client = config.client ?? a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client);
        this.transport = config.transport ?? new GnosisServiceTransport_1.GnosisServiceTransport(this.client, this.owner);
    }
    async getTx(safeTxHash) {
        return this.transport.getTx(safeTxHash);
    }
    async getTxConfirmations(safeTxHash) {
        return this.transport.getTxConfirmations(safeTxHash);
    }
    async confirmTx(safeTxHash, owner) {
        let acc = owner ?? this.owner;
        let signature = _signRaw_1.$signRaw.signEC(safeTxHash, acc.key);
        return this.transport.confirmTx(safeTxHash, {
            owner: acc.address,
            signature: signature.signature
        });
    }
    async submitTransaction(safeTxHash, options) {
        let tx = await this.transport.getTx(safeTxHash);
        let writer = a_di_1.default.resolve(ContractWriter_1.ContractWriter, this.safeAddress, this.client);
        let confirmations = tx.confirmations;
        if (options?.threshold != null) {
            let needCount = options.threshold;
            if (confirmations.length < needCount) {
                throw new Error(`Require ${needCount} confirmations, but got ${confirmations.length} for the tx ${safeTxHash}`);
            }
            if (confirmations.length > needCount) {
                // get confirmations count as required
                confirmations = confirmations.slice(0, needCount);
            }
        }
        let signaturesArr = (0, alot_1.default)(confirmations)
            .sortBy(x => x.owner)
            .map(x => x.signature)
            .toArray();
        let signatures = '0x' + signaturesArr.map(x => x.substring(2)).join('');
        let args = [
            tx.to,
            tx.value,
            tx.data ?? '0x',
            tx.operation,
            tx.safeTxGas,
            tx.baseGas,
            tx.gasPrice,
            tx.gasToken,
            tx.refundReceiver,
            signatures,
        ];
        let txWriter = await writer.writeAsync(this.owner, SafeAbi.execTransaction, args);
        return txWriter;
    }
    async execute(writer) {
        let value = BigInt(writer.builder.data.value?.toString() ?? 0);
        let { safeTxHash, threshold, safeTxData } = await this.createTransaction(writer, value);
        if (writer.options.txOutput != null) {
            await writer.saveTxAndExit({ safeTxHash, safeTxData });
            return;
        }
        await _fn_1.$fn.waitForObject(async () => {
            let confirmations = await this.getTxConfirmations(safeTxHash);
            if (confirmations.count >= threshold) {
                return [null, {}];
            }
            const addr = confirmations.results?.map(x => x.owner)?.join(', ');
            _logger_1.$logger.log(`Require ${threshold} confirmations. Got ${confirmations.count} (${addr}). Waiting`);
            return [null, null];
        }, {
            intervalMs: 3000
        });
        let tx = await this.submitTransaction(safeTxHash, { threshold });
        return tx;
    }
    async createTxHash(builder, value) {
        let txData = builder.getTxData(this.client);
        let safeTxEstimation = {
            to: _address_1.$address.toChecksum(txData.to),
            value: _bigint_1.$bigint.toHex(value ?? BigInt(txData.value?.toString() ?? 0n)),
            data: txData.data ?? null,
            operation: 0,
        };
        let safeInfo = await this.transport.getSafeInfo(this.safeAddress);
        // let estimated = await this.transport.estimateSafeTransaction(this.safeAddress, safeTxEstimation);
        let safeTxData = {
            ...safeTxEstimation,
            safeTxGas: 0,
            baseGas: 0,
            gasToken: _address_1.$address.ZERO,
            refundReceiver: _address_1.$address.ZERO,
            nonce: safeInfo.nonce,
            gasPrice: 0,
        };
        let safeTxHash = await this.getTransactionHash({
            ...safeTxData,
        });
        return {
            safeInfo,
            safeTxData,
            safeTxHash,
        };
    }
    async createTxSignature(safeTxHash) {
        return {
            signature: {
                signer: _address_1.$address.toChecksum(this.owner.address),
                data: _signRaw_1.$signRaw.signEC(safeTxHash, this.owner.key).signature
            }
        };
    }
    async createTransaction(writer, value) {
        let builder = writer.builder;
        let { safeTxHash, safeTxData, safeInfo, } = await this.createTxHash(builder, value);
        let { signature, } = await this.createTxSignature(safeTxHash);
        let signatures = new Map();
        signatures.set(this.owner.address.toLowerCase(), signature);
        // https://docs.gnosis-safe.io/tutorials/tutorial_tx_service_initiate_sign
        let txProps = {
            safeAddress: _address_1.$address.toChecksum(this.safeAddress),
            senderAddress: _address_1.$address.toChecksum(this.owner.address),
            safeTransaction: {
                data: safeTxData,
                signatures: signatures,
            },
            safeTxHash,
        };
        await this.transport.proposeTransaction(txProps);
        writer.emit('safeTxProposed', txProps);
        return {
            threshold: Number(safeInfo.threshold),
            safeTxData,
            safeTxHash
        };
    }
    async getSafeSdk() {
        let adapter = await this.getAdapter();
        const safeSdk = await safe_core_sdk_1.default.create({
            ethAdapter: adapter,
            safeAddress: this.safeAddress
        });
        return safeSdk;
    }
    async getAdapter() {
        return _gnosis_1.$gnosis.getAdapter(this.owner, this.client);
    }
    getTransactionHash(params) {
        let args = [
            params.to,
            params.value ? _bigint_1.$bigint.toHex(params.value) : 0,
            params.data ?? '0x',
            params.operation,
            params.safeTxGas,
            params.baseGas ?? 0,
            params.gasPrice ?? 0,
            params.gasToken ?? _address_1.$address.ZERO,
            params.refundReceiver ?? _address_1.$address.ZERO,
            params.nonce,
        ];
        return this.client.readContract({
            address: this.safeAddress,
            method: 'getTransactionHash',
            arguments: args,
            abi: [
                SafeAbi.getTransactionHash
            ]
        });
    }
    static parseSafeTx(buffer, value) {
        const inter = new ethers_1.utils.Interface([SafeAbi.execTransaction]);
        const decodedInput = inter.parseTransaction({
            data: buffer,
            value: value,
        });
        return {
            name: decodedInput.name,
            args: _contract_1.$contract.normalizeArgs(Array.from(decodedInput.args))
        };
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], GnosisSafeHandler.prototype, "getSafeSdk", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], GnosisSafeHandler.prototype, "getAdapter", null);
exports.GnosisSafeHandler = GnosisSafeHandler;
// https://etherscan.io/address/0x34cfac646f301356faa8b21e94227e3583fe3f5f#code
const SafeAbi = {
    nonce: {
        "constant": true,
        "inputs": [],
        "name": "nonce",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    execTransaction: {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "name": "execTransaction",
        "inputs": [
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "value",
                "internalType": "uint256"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            },
            {
                "type": "uint8",
                "name": "operation",
                "internalType": "enum Enum.Operation"
            },
            {
                "type": "uint256",
                "name": "safeTxGas",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "baseGas",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "gasPrice",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "gasToken",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "refundReceiver",
                "internalType": "address payable"
            },
            {
                "type": "bytes",
                "name": "signatures",
                "internalType": "bytes"
            }
        ]
    },
    getTransactionHash: {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
            }
        ],
        "name": "getTransactionHash",
        "inputs": [
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "value",
                "internalType": "uint256"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            },
            {
                "type": "uint8",
                "name": "operation",
                "internalType": "enum Enum.Operation"
            },
            {
                "type": "uint256",
                "name": "safeTxGas",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "baseGas",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "gasPrice",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "gasToken",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "refundReceiver",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "_nonce",
                "internalType": "uint256"
            }
        ]
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_safe_GnosisSafeHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_safe_GnosisSafeHandler) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_safe_GnosisSafeHandler, module.exports);
    } else {
        _dequanto_src_safe_GnosisSafeHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_sig_transports_SigFileTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_sig_transports_SigFileTransport != null ? _dequanto_src_txs_sig_transports_SigFileTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigFileTransport = void 0;
const _logger_1 = _dequanto_src_utils__logger;
const _sign_1 = _dequanto_src_utils__sign;
const _txData_1 = _dequanto_src_utils__txData;
const atma_io_1 = require("atma-io");
const ethers_1 = require("ethers");
class SigFileTransport {
    async create(path, txBuilder) {
        let tx = _txData_1.$txData.getJson(txBuilder.data, txBuilder.client);
        let json = {
            account: {
                address: txBuilder.account?.address
            },
            tx,
            config: txBuilder.config,
            raw: ethers_1.utils.serializeTransaction(tx),
            signature: null,
        };
        await atma_io_1.File.writeAsync(path, json);
        _logger_1.$logger.log('');
        _logger_1.$logger.log(`Tx data saved to the file "${path}".`);
        _logger_1.$logger.log(`Sign the data, insert the signature to the "signature" field and save the file.`);
        _logger_1.$logger.log(`Waiting for the signature...`);
        _logger_1.$logger.log(`... or you can close this process, and continue later with "0xweb tx send ${path}"`);
        _logger_1.$logger.log('');
        return new Promise((resolve) => {
            atma_io_1.File.watch(path, async () => {
                _logger_1.$logger.log(`File changed. Checking signature...`);
                let json = await atma_io_1.File.readAsync(path, { cached: false });
                if (json?.signature == null) {
                    _logger_1.$logger.log(`Signature not found. Still waiting...`);
                    return;
                }
                let signed = await _sign_1.$sign.serializeTx(tx, json.signature);
                resolve(signed);
            });
        });
    }
}
exports.SigFileTransport = SigFileTransport;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_sig_transports_SigFileTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_sig_transports_SigFileTransport) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_sig_transports_SigFileTransport, module.exports);
    } else {
        _dequanto_src_txs_sig_transports_SigFileTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_txs_TxWriter;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_txs_TxWriter != null ? _dequanto_src_txs_TxWriter : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxWriter = void 0;
_dequanto_src_env_BigIntSerializer;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const atma_utils_1 = require("atma-utils");
const _bigint_1 = _dequanto_src_utils__bigint;
const _txData_1 = _dequanto_src_utils__txData;
const _sign_1 = _dequanto_src_utils__sign;
const _logger_1 = _dequanto_src_utils__logger;
const _promise_1 = _dequanto_src_utils__promise;
const _account_1 = _dequanto_src_utils__account;
const _gas_1 = _dequanto_src_utils__gas;
const TxDataBuilder_1 = _dequanto_src_txs_TxDataBuilder;
const TxLogger_1 = _dequanto_src_txs_TxLogger;
const ChainAccountsService_1 = _dequanto_src_ChainAccountsService;
const Web3ClientFactory_1 = _dequanto_src_clients_Web3ClientFactory;
const ClientErrorUtil_1 = _dequanto_src_clients_utils_ClientErrorUtil;
const TxLogParser_1 = _dequanto_src_txs_receipt_TxLogParser;
const GnosisSafeHandler_1 = _dequanto_src_safe_GnosisSafeHandler;
const SigFileTransport_1 = _dequanto_src_txs_sig_transports_SigFileTransport;
class TxWriter extends atma_utils_1.class_EventEmitter {
    constructor(client, builder, account) {
        super();
        this.client = client;
        this.builder = builder;
        this.account = account;
        this.isSafe = _account_1.$account.isSafe(this.account);
        this.onSent = new atma_utils_1.class_Dfr();
        this.onCompleted = new atma_utils_1.class_Dfr();
        this.id = Math.round(Math.random() * 10 ** 10) + '';
        this.tx = null;
        this.txs = [];
        this.logger = new TxLogger_1.TxLogger(this.id, this.getSenderName(), this.builder);
        this.confirmationAwaiters = [];
    }
    onConfirmed(waitForCount) {
        let promise = new atma_utils_1.class_Dfr();
        if (this.tx.confirmations >= waitForCount) {
            promise.resolve(this.tx.hash);
        }
        else {
            this.confirmationAwaiters.push({
                count: waitForCount,
                promise
            });
        }
        return promise;
    }
    wait() {
        return this.onCompleted;
    }
    send(options) {
        if (this.tx == null) {
            this.logger.logStart();
            this.onCompleted.defer();
            this.onSent.defer();
            // was not sent
            this.options = options;
            this.sendTxInner();
        }
        return this;
    }
    write(options) {
        if (this.builder?.config?.send !== 'manual') {
            this.send(options);
        }
    }
    async sendTxInner() {
        if (this.isSafe) {
            let safeAccount = this.account;
            let sender = await this.getSender();
            let safe = new GnosisSafeHandler_1.GnosisSafeHandler({
                safeAddress: safeAccount.address ?? safeAccount.safeAddress,
                owner: sender,
                client: this.client,
                transport: this.options?.safeTransport
            });
            let innerWriter = await safe.execute(this);
            this.pipeInnerWriter(innerWriter);
            return;
        }
        let time = Date.now();
        let sender = await this.getSender();
        if (this.builder.data.nonce == null) {
            await this.builder.setNonce();
        }
        if (this.options?.txOutput != null) {
            // handle none blockchain
            await this.saveTxAndExit();
            return;
        }
        let key = sender?.key;
        let signedTxBuffer = key == null
            ? null
            : await this.builder.signToString(sender.key);
        if (signedTxBuffer == null) {
            if (this.options?.sigTransport != null) {
                let transport = a_di_1.default.resolve(SigFileTransport_1.SigFileTransport);
                signedTxBuffer = await transport.create(this.options.sigTransport, this.builder);
            }
            if (this.options?.signature) {
                let tx = _txData_1.$txData.getJson(this.builder.data, this.client);
                signedTxBuffer = await _sign_1.$sign.serializeTx(tx, this.options.signature);
            }
        }
        let tx = {
            timestamp: Date.now(),
            confirmations: 0,
            hash: null,
            receipt: null,
            timeout: null,
        };
        tx.timeout = this.startTimer(tx);
        this.tx = tx;
        this.txs.push(tx);
        let promiEvent;
        if (signedTxBuffer != null) {
            promiEvent = this
                .client
                .sendSignedTransaction(signedTxBuffer);
        }
        else {
            promiEvent = this
                .client
                .sendTransaction(this.builder.getTxData(this.client));
        }
        promiEvent
            .once('transactionHash', hash => {
            if (tx.hash === hash) {
                return;
            }
            if (tx.hash && tx.timeout) {
                // network has reaccepted the tx, restart previous timeout
                this.clearTimer(tx);
                tx.timeout = this.startTimer(tx);
            }
            tx.hash = hash;
            this.onSent.resolve(hash);
            this.emit('transactionHash', hash);
            this.emit('log', `Tx hash: ${hash}`);
        })
            // .on('confirmation', (confNumber, receipt) => {
            //     tx.hash = receipt.transactionHash ?? tx.hash;
            //     this.onSent.resolve();
            //     this.emit('confirmation', confNumber, receipt);
            //     this.emit('log', `Tx confirmation received for ${tx.hash}. Confirmations: ${confNumber}`);
            //     let arr = this.confirmationAwaiters;
            //     for (let i = 0; i < arr.length; i++) {
            //         if (confNumber >= arr[i].count) {
            //             arr[i].promise.resolve();
            //             arr.splice(i, 1);
            //             i--;
            //         }
            //     }
            // })
            .on('error', error => {
            this.onSent.reject(error);
            this.onCompleted.reject(error);
            this.clearTimer(tx);
            this.logger.logError(error);
            this.emit('error', error);
            this.emit('log', `Tx ERROR "${error.message}"`);
        })
            .then(async (receipt) => {
            this.clearTimer(tx);
            try {
                await this.extractLogs(receipt, tx);
            }
            catch (error) {
                console.error('Logs error', error);
            }
            try {
                tx.receipt = receipt;
                tx.hash = receipt.transactionHash ?? tx.hash;
                this.receipt = receipt;
                this.logger.logReceipt(receipt, Date.now() - time);
                this.onSent.resolve();
                this.emit('receipt', receipt);
                let hash = tx.hash;
                let status = receipt.status;
                let gasFormatted = _gas_1.$gas.formatUsed(this.builder.data, receipt);
                this.emit('log', `Tx receipt: ${hash}.\n\tStatus: ${status}.\n\tGas used: ${gasFormatted}`);
                this.onCompleted.resolve(receipt);
            }
            catch (error) {
                console.error('FATAL ERROR', error);
                throw error;
            }
        }, async (err) => {
            this.logger.log(`Tx errored ${err.message}`);
            this.clearTimer(tx);
            tx.error = err;
            const options = this.options ?? {};
            if (err.receipt?.status === false) {
                // read reason
                // let client = await this.client.getWeb3();
                // let tx = await this.client.getTransaction(err.receipt.transactionHash);
                // $logger.log('RECEIPT', err.receipt, tx);
                // try {
                //     let result = await client.eth.call(tx, tx.blockNumber);
                //     $logger.log('RESULT', result);
                // } catch (err) {
                //     $logger.log('CALL ERROR', err);
                // }
                // throw new Error('asd');
            }
            if (ClientErrorUtil_1.ClientErrorUtil.IsInsufficientFunds(err)) {
                if (this.builder.config?.gasFunding) {
                    this.fundAccountAndResend().catch(err => {
                        this.onCompleted.reject(err);
                    });
                    return;
                }
                if (options.retries == null) {
                    options.retries = 1;
                    options.retryDelay = 5000;
                    // If insufficient funds this is can be due to the blockchain hasn't confirmed some incomming transactions
                }
            }
            if (ClientErrorUtil_1.ClientErrorUtil.IsNonceTooLow(err)) {
                if (options.retries == null) {
                    options.retries = 1;
                }
                let nonce = this.builder.data.nonce;
                // reset nonce
                await this.builder.setNonce();
                this.logger.log(`Nonce was ${Number(nonce)} too low. Reetries left: ${options.retries}. New nonce: ${Number(this.builder.data.nonce)}`);
            }
            let submitsCount = this.txs.length;
            let submitsMax = (options.retries ?? 0) + 1;
            if (submitsCount < submitsMax) {
                let ms = options.retryDelay ?? 3000;
                let waitMs = ms * submitsCount;
                _logger_1.$logger.log(`Tx retry in ${waitMs}ms`);
                await _promise_1.$promise.wait(waitMs);
                let onErrorRebuild = options.onErrorRebuild;
                if (onErrorRebuild != null) {
                    let txBuilder = await onErrorRebuild(this, err, submitsCount);
                    if (txBuilder != null) {
                        this.builder = txBuilder;
                    }
                }
                this.resubmit({ increaseGas: false });
                return;
            }
            this.onCompleted.reject(err);
        });
    }
    async getSender() {
        let account = this.account;
        let sender = _account_1.$account.getSender(account);
        if (sender.key == null) {
            /** check the encrypted storage. In case no key is found, assume the target node contains unlocked or locked account */
            let addressOrName = sender.address ?? sender.name;
            let service = a_di_1.default.resolve(ChainAccountsService_1.ChainAccountsService);
            let fromStorage = await service.get(addressOrName, this.client.platform);
            if (fromStorage) {
                sender = fromStorage;
            }
        }
        return sender;
    }
    getSenderName() {
        let sender = _account_1.$account.getSender(this.account);
        return sender.name ?? sender.address;
    }
    async extractLogs(receipt, tx) {
        let parser = a_di_1.default.resolve(TxLogParser_1.TxLogParser);
        let logs = await parser.parse(receipt);
        tx.knownLogs = logs.filter(x => x != null);
    }
    async fundAccountAndResend() {
        let gasFunding = this.builder.config.gasFunding;
        let sender = _account_1.$account.getSender(this.account);
        await this.builder.setGas({
            gasEstimation: true,
            from: sender.address
        });
        let { gasLimit } = this.builder.data;
        let gasPrice = TxDataBuilder_1.TxDataBuilder.getGasPrice(this.builder);
        let LITTLE_BIT_MORE = 1.3;
        let wei = _bigint_1.$bigint.multWithFloat(gasPrice * BigInt(gasLimit), LITTLE_BIT_MORE);
        let fundTx = await this.transferNative(gasFunding, sender.address, wei);
        await fundTx.onCompleted;
        // account was funded resubmit the tx
        this.resubmit();
    }
    startTimer(tx) {
        let timeout = this.options?.timeout;
        let ms;
        if (typeof timeout === 'boolean') {
            if (timeout === false) {
                // Timeout was disabled
                return null;
            }
            ms = this.client.TIMEOUT;
        }
        else {
            ms = timeout ?? this.client.TIMEOUT;
        }
        return setTimeout(() => {
            if (this.txs.length > 3) {
                let hashes = this.txs.map(x => x.hash).join(', ');
                this.onCompleted.reject(new Error(`${this.txs.length} retries timeouted, with hashes: ${hashes}`));
                return;
            }
            tx.error = new Error(`Timeouted ${ms}ms`);
            this.resubmit();
        }, ms);
    }
    clearTimer(tx) {
        if (tx.timeout) {
            clearTimeout(tx.timeout);
            tx.timeout = null;
        }
    }
    resubmit({ increaseGas = true } = {}) {
        if (increaseGas !== false) {
            this.builder.increaseGas(1.1);
        }
        this.sendTxInner();
    }
    pipeInnerWriter(innerWriter) {
        innerWriter.onCompleted.then((receipt) => this.onCompleted.resolve(receipt), (error) => this.onCompleted.reject(error));
        innerWriter.onSent.then((hash) => this.onSent.resolve(hash), (error) => this.onSent.reject(error));
        innerWriter.on('error', error => this.emit('error', error));
        innerWriter.on('log', message => this.emit('log', message));
    }
    /** Use this transfer also in case of additional account funding */
    async transferNative(from, to, amount) {
        let txBuilder = new TxDataBuilder_1.TxDataBuilder(this.client, from, {
            to: to,
            value: _bigint_1.$bigint.toHex(amount)
        });
        let GAS = 21000;
        await Promise.all([
            txBuilder.setGas({ gasLimit: GAS }),
            txBuilder.setNonce(),
        ]);
        return TxWriter.write(this.client, txBuilder, from);
    }
    toJSON() {
        let account = this.account;
        if (typeof account !== 'string') {
            account = JSON.parse(JSON.stringify(account));
            // Clean any KEY to prevent leaking. When resubmitted if one is required should be taken from the storage
            if (_account_1.$account.isSafe(account)) {
                delete account.operator?.key;
            }
            else {
                delete account.key;
            }
        }
        return {
            id: this.id,
            platform: this.client.platform,
            options: this.options,
            account: account,
            txs: this.txs,
            builder: this.builder.toJSON(),
        };
    }
    //** We can save the Tx Data for later reuse/blockchain send */
    async saveTxAndExit(additionalProperties) {
        let path = this.options?.txOutput;
        await this.builder.save(path, additionalProperties);
        this.onSent.resolve(path);
        this.onCompleted.reject(new Error(`Transaction is not submited to the blockchain. It has been saved to "${path}". Listen to "onSent" promise`));
    }
    static async fromJSON(json, client, account) {
        client = client ?? Web3ClientFactory_1.Web3ClientFactory.get(json.platform);
        account = account ?? json.account;
        let builder = TxDataBuilder_1.TxDataBuilder.fromJSON(client, account, {
            config: json.builder.config,
            tx: json.builder.tx,
        });
        let writer = TxWriter.create(client, builder, account, json.options);
        let txs = json.txs;
        writer.id = json.id;
        writer.tx = txs[txs.length - 1];
        writer.txs = txs;
        writer.receipt = txs.find(x => x.receipt)?.receipt;
        return writer;
    }
    static write(client, builder, account, options) {
        let writer = new TxWriter(client, builder, account);
        writer.write(options);
        return writer;
    }
    static create(client, builder, account, options) {
        return new TxWriter(client, builder, account);
    }
    static async writeTxData(client, data, account, options) {
        let txBuilder = new TxDataBuilder_1.TxDataBuilder(client, account, data);
        await Promise.all([
            txBuilder.setGas(),
            txBuilder.setNonce(),
        ]);
        let w = new TxWriter(client, txBuilder, account);
        w.send(options);
        return w;
    }
}
exports.TxWriter = TxWriter;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_txs_TxWriter === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_txs_TxWriter) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_txs_TxWriter, module.exports);
    } else {
        _dequanto_src_txs_TxWriter = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractWriter;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractWriter != null ? _dequanto_src_contracts_ContractWriter : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractWriter = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const TxWriter_1 = _dequanto_src_txs_TxWriter;
const TxDataBuilder_1 = _dequanto_src_txs_TxDataBuilder;
const _abiParser_1 = _dequanto_src_utils__abiParser;
const _logger_1 = _dequanto_src_utils__logger;
const _class_1 = _dequanto_src_utils__class;
const _account_1 = _dequanto_src_utils__account;
const _require_1 = _dequanto_src_utils__require;
class ContractWriter {
    constructor(address, client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client)) {
        this.address = address;
        this.client = client;
    }
    $config(builderConfig, writerConfig) {
        return _class_1.$class.curry(this, {
            builderConfig: builderConfig ?? this.builderConfig,
            writerConfig: writerConfig ?? this.writerConfig,
        });
    }
    /**
    * We split Tx sending in two awaitable steps
    * 1. This method prepairs(gas, nonce, etc) - and sends the Tx
    * 2. With returned writer you can subscribe to events and/or wait for Tx to be mined
    * @param account
    * @param interfaceAbi
    * @param params
    * @param configs
    * @returns {TxWriter}
     */
    async writeAsync(account, interfaceAbi, params, configs) {
        _require_1.$require.notNull(account, 'Account parameter is undefined.');
        let value = typeof account !== 'string'
            ? account.value
            : null;
        let isSafe = _account_1.$account.isSafe(account);
        let sender = _account_1.$account.getSender(account);
        // if (sender.key == null) {
        //     let addressOrName = sender.address ?? sender.name;
        //     let service = di.resolve(ChainAccountsService);
        //     let fromStorage = await service.get(addressOrName, this.client.platform);
        //     if (fromStorage) {
        //         account = fromStorage;
        //     }
        // }
        let txBuilder = new TxDataBuilder_1.TxDataBuilder(this.client, sender, {
            to: this.address
        });
        let abi = typeof interfaceAbi === 'string'
            ? _abiParser_1.$abiParser.parseMethod(interfaceAbi)
            : interfaceAbi;
        let builderConfig = {
            ...(this.builderConfig ?? {}),
            ...(configs?.builderConfig ?? {}),
        };
        txBuilder.setConfig(builderConfig);
        txBuilder.setValue(value);
        txBuilder.setInputDataWithABI(abi, ...params);
        if (isSafe !== true) {
            await Promise.all([
                txBuilder.setGas({
                    price: builderConfig.gasPrice,
                    priceRatio: builderConfig.gasPriceRatio,
                    gasLimit: builderConfig.gasLimit,
                    gasLimitRatio: builderConfig.gasLimitRatio,
                    gasEstimation: builderConfig.gasEstimation,
                    from: builderConfig.from ?? sender.address,
                    type: builderConfig.type ?? null,
                }),
                txBuilder.setNonce({
                    nonce: builderConfig.nonce,
                    noncePending: builderConfig.noncePending,
                }),
            ]);
        }
        let writer = TxWriter_1.TxWriter.write(this.client, txBuilder, account, configs?.writerConfig ?? this.writerConfig);
        writer.on('log', message => {
            _logger_1.$logger.log(`TxContract ${abi.name}; ${message}`);
        });
        return writer;
    }
}
exports.ContractWriter = ContractWriter;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractWriter === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractWriter) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractWriter, module.exports);
    } else {
        _dequanto_src_contracts_ContractWriter = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractStream != null ? _dequanto_src_contracts_ContractStream : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStream = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
class ContractStream {
    constructor(address, abi, client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client)) {
        this.address = address;
        this.abi = abi;
        this.client = client;
    }
    on(event, cb) {
        let stream = this.client.getEventStream(this.address, this.abi, event);
        return stream.onData(cb);
    }
}
exports.ContractStream = ContractStream;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractStream === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractStream) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractStream, module.exports);
    } else {
        _dequanto_src_contracts_ContractStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractBase != null ? _dequanto_src_contracts_ContractBase : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractBase = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const memd_1 = __importDefault(require("memd"));
const alot_1 = __importDefault(require("alot"));
const ethers_1 = require("ethers");
const _contract_1 = _dequanto_src_utils__contract;
const _class_1 = _dequanto_src_utils__class;
const _block_1 = _dequanto_src_utils__block;
const _abiParser_1 = _dequanto_src_utils__abiParser;
const ContractReader_1 = _dequanto_src_contracts_ContractReader;
const ContractWriter_1 = _dequanto_src_contracts_ContractWriter;
const ContractStream_1 = _dequanto_src_contracts_ContractStream;
const TxTopicInMemoryProvider_1 = _dequanto_src_txs_receipt_TxTopicInMemoryProvider;
class ContractBase {
    constructor(address, client, explorer) {
        this.address = address;
        this.client = client;
        this.explorer = explorer;
    }
    async getStorageAt(position) {
        let reader = await this.getContractReader();
        return reader.getStorageAt(this.address, position);
    }
    parseInputData(buffer, value) {
        const inter = new ethers_1.utils.Interface(this.abi);
        const decodedInput = inter.parseTransaction({
            data: buffer,
            value: value,
        });
        return {
            name: decodedInput.name,
            args: _contract_1.$contract.normalizeArgs(Array.from(decodedInput.args))
        };
    }
    async $executeBatch(values) {
        let reader = await this.getContractReader();
        return reader.executeBatch(values);
    }
    $config(builderConfig, writerConfig) {
        let $contract = _class_1.$class.curry(this, {
            builderConfig: builderConfig,
            writerConfig: writerConfig,
        });
        return $contract;
    }
    forBlock(mix) {
        if (typeof mix === 'undefined' || typeof mix === 'number') {
            return this.forBlockNumber(mix);
        }
        return this.forBlockAt(mix);
    }
    forBlockNumber(blockNumber) {
        let $contract = _class_1.$class.curry(this, {
            blockNumber: blockNumber,
            blockDate: null
        });
        return $contract;
    }
    forBlockAt(date) {
        let $contract = _class_1.$class.curry(this, {
            blockNumber: null,
            blockDate: date
        });
        return $contract;
    }
    $read(abi, ...params) {
        if (this.builderConfig?.send === 'manual') {
            let req = new ContractReader_1.ContractReaderUtils.DefferedRequest({
                address: this.address,
                abi,
                params,
                blockNumber: this.blockNumber ?? this.blockDate,
                options: {
                    from: this.builderConfig?.from
                }
            });
            return req;
        }
        let reader = this.getContractReader();
        return reader.readAsync(this.address, abi, ...params);
    }
    $on(event, cb) {
        let stream = this.getContractStream();
        return stream.on(event, cb);
    }
    async $write(abi, account, ...params) {
        let writer = await this.getContractWriter();
        return writer.writeAsync(account, abi, params, {
            builderConfig: this.builderConfig,
            writerConfig: this.writerConfig,
        });
    }
    $getAbiItem(type, name, argsCount) {
        let arr = this.abi.filter(x => x.type === type && x.name === name);
        if (arr.length === 0) {
            throw new Error(`AbiItem ${name} not found`);
        }
        if (arr.length === 1) {
            return arr[0];
        }
        if (argsCount == null) {
            throw new Error(`Found multiple AbiItems for ${name}. Args count not specified to pick one`);
        }
        return arr.find(x => (x.inputs?.length ?? 0) === argsCount);
    }
    $getAbiItemOverload(abis, args) {
        let $abis = abis
            .map(methodAbi => _abiParser_1.$abiParser.parseMethod(methodAbi))
            .filter(x => (x.inputs?.length ?? 0) === args.length);
        if ($abis.length === 0) {
            throw new Error(`ABI not found in overloads \n${abis.join('\n')}\n by arguments count. Got ${args.length} arguments`);
        }
        if ($abis.length === 1) {
            return $abis[0];
        }
        throw new Error(`Not implemented exception. Got multiple overloads for the argument count ${args.length}. We should pick the ABI by parameters type.`);
    }
    $extractLogs(tx, abiItem) {
        let logs = _contract_1.$contract.extractLogsForAbi(tx, abiItem);
        return logs;
    }
    $extractLog(log, abiItem) {
        let parsed = _contract_1.$contract.parseLogWithAbi(log, abiItem);
        return parsed;
    }
    async $getPastLogs(filters) {
        return this.client.getPastLogs(filters);
    }
    async $getPastLogsFilters(abi, options) {
        let filters = {};
        if (options.fromBlock != null) {
            filters.fromBlock = await _block_1.$block.ensureNumber(options.fromBlock, this.client);
        }
        if (options.toBlock != null) {
            filters.toBlock = await _block_1.$block.ensureNumber(options.toBlock, this.client);
        }
        let topics = [options.topic];
        (0, alot_1.default)(abi.inputs)
            .takeWhile(x => x.indexed)
            .forEach(arg => {
            let param = options.params?.[arg.name];
            if (param == null) {
                topics.push(undefined);
                return;
            }
            topics.push(param);
        })
            .toArray();
        filters.topics = topics;
        return filters;
    }
    getContractReader() {
        let reader = this.getContractReaderInner();
        if (this.blockDate != null) {
            reader.forBlockAt(this.blockDate);
        }
        if (this.blockNumber != null) {
            reader.forBlock(this.blockNumber);
        }
        let from = this.builderConfig?.from;
        if (from != null) {
            reader.withAddress(from);
        }
        return reader;
    }
    getContractReaderInner() {
        let reader = a_di_1.default.resolve(ContractReader_1.ContractReader, this.client);
        return reader;
    }
    async getContractWriter() {
        if (this.abi != null) {
            let logParser = a_di_1.default.resolve(TxTopicInMemoryProvider_1.TxTopicInMemoryProvider);
            logParser.register(this.abi);
        }
        let writer = a_di_1.default.resolve(ContractWriter_1.ContractWriter, this.address, this.client);
        return writer;
    }
    getContractStream() {
        let stream = a_di_1.default.resolve(ContractStream_1.ContractStream, this.address, this.abi, this.client);
        return stream;
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], ContractBase.prototype, "getContractReaderInner", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], ContractBase.prototype, "getContractWriter", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], ContractBase.prototype, "getContractStream", null);
exports.ContractBase = ContractBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractBase, module.exports);
    } else {
        _dequanto_src_contracts_ContractBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_xdai_WXDaiTokenContractBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_xdai_WXDaiTokenContractBase != null ? _dequanto_contracts_gen_xdai_WXDaiTokenContractBase : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXDaiTokenContractBase = void 0;
/**
 *  AUTO-Generated Class: 2021-12-15 23:03
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const XDaiscan_1 = _dequanto_src_chains_xdai_XDaiscan;
const XDaiWeb3Client_1 = _dequanto_src_chains_xdai_XDaiWeb3Client;
class WXDaiTokenContractBase extends ContractBase_1.ContractBase {
    constructor(address = '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', client = a_di_1.default.resolve(XDaiWeb3Client_1.XDaiWeb3Client), explorer = a_di_1.default.resolve(XDaiscan_1.XDaiscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "" }], "name": "name", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy" }, { "type": "uint256", "name": "wad" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "" }], "name": "totalSupply", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src" }, { "type": "address", "name": "dst" }, { "type": "uint256", "name": "wad" }], "constant": false }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad" }], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "" }], "name": "decimals", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "" }], "constant": true }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "" }], "name": "symbol", "inputs": [], "constant": true }, { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "bool", "name": "" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst" }, { "type": "uint256", "name": "wad" }], "constant": false }, { "type": "function", "stateMutability": "payable", "payable": true, "outputs": [], "name": "deposit", "inputs": [], "constant": false }, { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "" }], "name": "allowance", "inputs": [{ "type": "address", "name": "" }, { "type": "address", "name": "" }], "constant": true }, { "type": "fallback", "stateMutability": "payable", "payable": true }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "indexed": true }, { "type": "address", "name": "guy", "indexed": true }, { "type": "uint256", "name": "wad", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "indexed": true }, { "type": "address", "name": "dst", "indexed": true }, { "type": "uint256", "name": "wad", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "indexed": true }, { "type": "uint256", "name": "wad", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "indexed": true }, { "type": "uint256", "name": "wad", "indexed": false }], "anonymous": false }];
    }
    // 0x06fdde03
    async name() {
        return this.$read('function name() returns string');
    }
    // 0x095ea7b3
    async approve(eoa, guy, wad) {
        return this.$write(this.$getAbiItem('function', 'approve'), eoa, guy, wad);
    }
    // 0x18160ddd
    async totalSupply() {
        return this.$read('function totalSupply() returns uint256');
    }
    // 0x23b872dd
    async transferFrom(eoa, src, dst, wad) {
        return this.$write(this.$getAbiItem('function', 'transferFrom'), eoa, src, dst, wad);
    }
    // 0x2e1a7d4d
    async withdraw(eoa, wad) {
        console.log('WXDaiTokenContractBase.withdraw');
        return this.$write(this.$getAbiItem('function', 'withdraw'), eoa, wad);
    }
    // 0x313ce567
    async decimals() {
        return this.$read('function decimals() returns uint8');
    }
    // 0x70a08231
    async balanceOf(input0) {
        return this.$read('function balanceOf(address) returns uint256', input0);
    }
    // 0x95d89b41
    async symbol() {
        return this.$read('function symbol() returns string');
    }
    // 0xa9059cbb
    async transfer(eoa, dst, wad) {
        return this.$write(this.$getAbiItem('function', 'transfer'), eoa, dst, wad);
    }
    // 0xd0e30db0
    async deposit(eoa) {
        return this.$write(this.$getAbiItem('function', 'deposit'), eoa);
    }
    // 0xdd62ed3e
    async allowance(input0, input1) {
        return this.$read('function allowance(address, address) returns uint256', input0, input1);
    }
    onApproval(fn) {
        return this.$on('Approval', fn);
    }
    onTransfer(fn) {
        return this.$on('Transfer', fn);
    }
    onDeposit(fn) {
        return this.$on('Deposit', fn);
    }
    onWithdrawal(fn) {
        return this.$on('Withdrawal', fn);
    }
    extractLogsApproval(tx) {
        let abi = this.$getAbiItem('event', 'Approval');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransfer(tx) {
        let abi = this.$getAbiItem('event', 'Transfer');
        return this.$extractLogs(tx, abi);
    }
    extractLogsDeposit(tx) {
        let abi = this.$getAbiItem('event', 'Deposit');
        return this.$extractLogs(tx, abi);
    }
    extractLogsWithdrawal(tx) {
        let abi = this.$getAbiItem('event', 'Withdrawal');
        return this.$extractLogs(tx, abi);
    }
}
exports.WXDaiTokenContractBase = WXDaiTokenContractBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_xdai_WXDaiTokenContractBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_xdai_WXDaiTokenContractBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_xdai_WXDaiTokenContractBase, module.exports);
    } else {
        _dequanto_contracts_gen_xdai_WXDaiTokenContractBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_xdai_tokens_WXDaiTokenContract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_xdai_tokens_WXDaiTokenContract != null ? _dequanto_src_chains_xdai_tokens_WXDaiTokenContract : {};
    var module = { exports: exports };

    "use strict";
/**
 * dequanto
 * name: WXDaiTokenContractBase
 * platform: xdai
 * source.abi: ./WXDaiTokenContract.json
 * defaultAddress: 0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d
 * output: ./contracts/gen/xdai/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXDaiTokenContract = void 0;
const WXDaiTokenContractBase_1 = _dequanto_contracts_gen_xdai_WXDaiTokenContractBase;
class WXDaiTokenContract extends WXDaiTokenContractBase_1.WXDaiTokenContractBase {
}
exports.WXDaiTokenContract = WXDaiTokenContract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_xdai_tokens_WXDaiTokenContract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_xdai_tokens_WXDaiTokenContract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_xdai_tokens_WXDaiTokenContract, module.exports);
    } else {
        _dequanto_src_chains_xdai_tokens_WXDaiTokenContract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_base_ERC20Base_ERC20Base;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_base_ERC20Base_ERC20Base != null ? _dequanto_contracts_gen_base_ERC20Base_ERC20Base : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Base = void 0;
/**
 *  AUTO-Generated Class: 2022-06-23 17:13
 *  Implementation: https://polygonscan.com/address/undefined#code
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const Polyscan_1 = _dequanto_src_BlockchainExplorer_Polyscan;
const PolyWeb3Client_1 = _dequanto_src_clients_PolyWeb3Client;
class ERC20Base extends ContractBase_1.ContractBase {
    constructor(address = '', client = a_di_1.default.resolve(PolyWeb3Client_1.PolyWeb3Client), explorer = a_di_1.default.resolve(Polyscan_1.Polyscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
    }
    // 0x06fdde03
    async name() {
        return this.$read('function name() returns string');
    }
    // 0x095ea7b3
    async approve(sender, _spender, _value) {
        return this.$write(this.$getAbiItem('function', 'approve'), sender, _spender, _value);
    }
    // 0x18160ddd
    async totalSupply() {
        return this.$read('function totalSupply() returns uint256');
    }
    // 0x23b872dd
    async transferFrom(sender, _from, _to, _value) {
        return this.$write(this.$getAbiItem('function', 'transferFrom'), sender, _from, _to, _value);
    }
    // 0x313ce567
    async decimals() {
        return this.$read('function decimals() returns uint8');
    }
    // 0x70a08231
    async balanceOf(_owner) {
        return this.$read('function balanceOf(address) returns uint256', _owner);
    }
    // 0x95d89b41
    async symbol() {
        return this.$read('function symbol() returns string');
    }
    // 0xa9059cbb
    async transfer(sender, _to, _value) {
        return this.$write(this.$getAbiItem('function', 'transfer'), sender, _to, _value);
    }
    // 0xdd62ed3e
    async allowance(_owner, _spender) {
        return this.$read('function allowance(address, address) returns uint256', _owner, _spender);
    }
    onApproval(fn) {
        return this.$on('Approval', fn);
    }
    onTransfer(fn) {
        return this.$on('Transfer', fn);
    }
    extractLogsApproval(tx) {
        let abi = this.$getAbiItem('event', 'Approval');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransfer(tx) {
        let abi = this.$getAbiItem('event', 'Transfer');
        return this.$extractLogs(tx, abi);
    }
    async getPastLogsApproval(options) {
        let topic = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
        let abi = this.$getAbiItem('event', 'Approval');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsTransfer(options) {
        let topic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
        let abi = this.$getAbiItem('event', 'Transfer');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
}
exports.ERC20Base = ERC20Base;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_base_ERC20Base_ERC20Base === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_base_ERC20Base_ERC20Base) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_base_ERC20Base_ERC20Base, module.exports);
    } else {
        _dequanto_contracts_gen_base_ERC20Base_ERC20Base = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_common_ERC20;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_common_ERC20 != null ? _dequanto_src_contracts_common_ERC20 : {};
    var module = { exports: exports };

    "use strict";
/**
 * dequanto
 * name: ERC20Base
 * platform: polygon
 * source.abi: ./contracts/abi/erc20.abi.json
 * output: ./contracts/gen/base/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = void 0;
const ERC20Base_1 = _dequanto_contracts_gen_base_ERC20Base_ERC20Base;
class ERC20 extends ERC20Base_1.ERC20Base {
}
exports.ERC20 = ERC20;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_common_ERC20 === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_common_ERC20) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_common_ERC20, module.exports);
    } else {
        _dequanto_src_contracts_common_ERC20 = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensService != null ? _dequanto_src_tokens_TokensService : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const memd_1 = __importDefault(require("memd"));
const ERC20_1 = _dequanto_src_contracts_common_ERC20;
const Web3ClientFactory_1 = _dequanto_src_clients_Web3ClientFactory;
const BlockChainExplorerProvider_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider;
const TokenDataProvider_1 = _dequanto_src_tokens_TokenDataProvider;
class TokensService {
    constructor(platform, explorer) {
        this.platform = platform;
        this.explorer = explorer;
        this.provider = new TokenDataProvider_1.TokenDataProvider(this.platform, this.explorer);
    }
    async getTokenOrDefault(address, chainLookup = true) {
        return this.provider.getTokenOrDefault(address, chainLookup);
    }
    async getToken(mix, chainLookup = true) {
        return this.provider.getToken(mix, chainLookup);
    }
    async getKnownToken(mix) {
        return this.provider.getKnownToken(mix);
    }
    async addKnownToken(token) {
        await this.provider.addKnownToken(token);
    }
    isNative(mix) {
        return this.provider.isNative(mix);
    }
    getNative(platform = this.platform) {
        return this.provider.getNative(platform);
    }
    /** Download tokens with various exchange/swap providers and merge them into one collection. */
    async redownload() {
        return this.provider.redownload();
    }
    async getTokenByAddress(address, chainLookup = true) {
        return this.provider.getTokenByAddress(address, chainLookup);
    }
    async getTokenBySymbol(symbol, chainLookup = true) {
        return this.provider.getTokenBySymbol(symbol, chainLookup);
    }
    static async erc20(token, platform) {
        let client = Web3ClientFactory_1.Web3ClientFactory.get(platform);
        let explorer = BlockChainExplorerProvider_1.BlockChainExplorerProvider.get(platform);
        if (typeof token === 'string') {
            let service = a_di_1.default.resolve(TokensService, platform, explorer);
            token = await service.getToken(token);
        }
        if (token == null) {
            throw new Error(`Token not found ${arguments[0]} in ${platform}`);
        }
        return new ERC20_1.ERC20(token.address, client, explorer);
    }
    async erc20(token) {
        return TokensService.erc20(token, this.platform);
        // let client = Web3ClientFactory.get(this.platform);
        // let explorer = BlockChainExplorerProvider.get(this.platform);
        // let t = typeof token === 'string'
        //     ? await this.getToken(token)
        //     : token;
        // if (t == null) {
        //     if (typeof token === 'string' && $address.isValid(token)) {
        //         t = {
        //             address: token,
        //             decimals: 18,
        //             platform: this.platform
        //         };
        //     }
        //     throw new Error(`Token not found: ${arguments[0]}`);
        // }
        // return new ERC20(t.address, client, explorer);
    }
}
__decorate([
    memd_1.default.deco.memoize()
], TokensService.prototype, "erc20", null);
__decorate([
    memd_1.default.deco.memoize()
], TokensService, "erc20", null);
exports.TokensService = TokensService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensService, module.exports);
    } else {
        _dequanto_src_tokens_TokensService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensServiceBsc;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensServiceBsc != null ? _dequanto_src_tokens_TokensServiceBsc : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServiceBsc = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
class TokensServiceBsc extends TokensService_1.TokensService {
    constructor() {
        super('bsc', a_di_1.default.resolve(Bscscan_1.Bscscan));
    }
    static async erc20(mix) {
        return TokensService_1.TokensService.erc20(mix, 'bsc');
    }
}
exports.TokensServiceBsc = TokensServiceBsc;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensServiceBsc === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensServiceBsc) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensServiceBsc, module.exports);
    } else {
        _dequanto_src_tokens_TokensServiceBsc = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensServiceEth;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensServiceEth != null ? _dequanto_src_tokens_TokensServiceEth : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServiceEth = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
class TokensServiceEth extends TokensService_1.TokensService {
    constructor() {
        super('eth', a_di_1.default.resolve(Etherscan_1.Etherscan));
    }
}
exports.TokensServiceEth = TokensServiceEth;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensServiceEth === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensServiceEth) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensServiceEth, module.exports);
    } else {
        _dequanto_src_tokens_TokensServiceEth = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensServicePolygon;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensServicePolygon != null ? _dequanto_src_tokens_TokensServicePolygon : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServicePolygon = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const Polyscan_1 = _dequanto_src_BlockchainExplorer_Polyscan;
class TokensServicePolygon extends TokensService_1.TokensService {
    constructor() {
        super('polygon', a_di_1.default.resolve(Polyscan_1.Polyscan));
    }
    static async erc20(mix) {
        return TokensService_1.TokensService.erc20(mix, 'polygon');
    }
}
exports.TokensServicePolygon = TokensServicePolygon;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensServicePolygon === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensServicePolygon) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensServicePolygon, module.exports);
    } else {
        _dequanto_src_tokens_TokensServicePolygon = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensServiceXDai;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensServiceXDai != null ? _dequanto_src_tokens_TokensServiceXDai : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServiceXDai = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const XDaiscan_1 = _dequanto_src_chains_xdai_XDaiscan;
class TokensServiceXDai extends TokensService_1.TokensService {
    constructor() {
        super('xdai', a_di_1.default.resolve(XDaiscan_1.XDaiscan));
    }
    static async erc20(mix) {
        return TokensService_1.TokensService.erc20(mix, 'xdai');
    }
    async getTokenBySymbol(symbol, chainLookup = true) {
        if (symbol === 'DAI') {
            symbol = 'wxDAI';
        }
        return super.getTokenBySymbol(symbol, chainLookup);
    }
}
exports.TokensServiceXDai = TokensServiceXDai;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensServiceXDai === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensServiceXDai) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensServiceXDai, module.exports);
    } else {
        _dequanto_src_tokens_TokensServiceXDai = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_arbitrum_TokensServiceArbitrum;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_arbitrum_TokensServiceArbitrum != null ? _dequanto_src_chains_arbitrum_TokensServiceArbitrum : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServiceArbitrum = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const Arbiscan_1 = _dequanto_src_chains_arbitrum_Arbiscan;
class TokensServiceArbitrum extends TokensService_1.TokensService {
    constructor() {
        super('arbitrum', a_di_1.default.resolve(Arbiscan_1.Arbiscan));
    }
    static async erc20(mix) {
        return TokensService_1.TokensService.erc20(mix, 'arbitrum');
    }
}
exports.TokensServiceArbitrum = TokensServiceArbitrum;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_arbitrum_TokensServiceArbitrum === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_arbitrum_TokensServiceArbitrum) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_arbitrum_TokensServiceArbitrum, module.exports);
    } else {
        _dequanto_src_chains_arbitrum_TokensServiceArbitrum = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokensServiceFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokensServiceFactory != null ? _dequanto_src_tokens_TokensServiceFactory : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensServiceFactory = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensServiceBsc_1 = _dequanto_src_tokens_TokensServiceBsc;
const TokensServiceEth_1 = _dequanto_src_tokens_TokensServiceEth;
const TokensServicePolygon_1 = _dequanto_src_tokens_TokensServicePolygon;
const TokensServiceXDai_1 = _dequanto_src_tokens_TokensServiceXDai;
const TokensServiceArbitrum_1 = _dequanto_src_chains_arbitrum_TokensServiceArbitrum;
const TokensService_1 = _dequanto_src_tokens_TokensService;
var TokensServiceFactory;
(function (TokensServiceFactory) {
    function get(platform) {
        switch (platform) {
            case 'bsc':
                return a_di_1.default.resolve(TokensServiceBsc_1.TokensServiceBsc);
            case 'eth':
                return a_di_1.default.resolve(TokensServiceEth_1.TokensServiceEth);
            case 'polygon':
                return a_di_1.default.resolve(TokensServicePolygon_1.TokensServicePolygon);
            case 'xdai':
                return a_di_1.default.resolve(TokensServiceXDai_1.TokensServiceXDai);
            case 'arbitrum':
                return a_di_1.default.resolve(TokensServiceArbitrum_1.TokensServiceArbitrum);
            case 'hardhat':
                return a_di_1.default.resolve(TokensService_1.TokensService, 'hardhat');
            default:
                throw new Error(`Unsupported platform ${platform} for TokensService`);
        }
    }
    TokensServiceFactory.get = get;
})(TokensServiceFactory = exports.TokensServiceFactory || (exports.TokensServiceFactory = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokensServiceFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokensServiceFactory) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokensServiceFactory, module.exports);
    } else {
        _dequanto_src_tokens_TokensServiceFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenService != null ? _dequanto_src_tokens_TokenService : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const WXDaiTokenContract_1 = _dequanto_src_chains_xdai_tokens_WXDaiTokenContract;
const _bigint_1 = _dequanto_src_utils__bigint;
const TokensServiceFactory_1 = _dequanto_src_tokens_TokensServiceFactory;
const _require_1 = _dequanto_src_utils__require;
class TokenService {
    constructor(client) {
        this.client = client;
        this.tokensProvider = TokensServiceFactory_1.TokensServiceFactory.get(this.client.platform);
    }
    async balanceOf(address, token) {
        token = await this.getToken(token);
        let isNative = this.tokensProvider.isNative(token.address);
        if (isNative) {
            return this.client.getBalance(address);
        }
        let erc20 = await this.tokensProvider.erc20(token);
        let balance = await erc20.balanceOf(address);
        return balance;
    }
    async hasToken(address, token, amount) {
        let t = await this.getToken(token);
        let balance = await this.balanceOf(address, t);
        let wei = _bigint_1.$bigint.toWei(amount, t.decimals);
        return wei <= balance;
    }
    async ensureApproved(account, tokenMix, spender, amount) {
        let token = await this.getToken(tokenMix);
        let erc20 = await this.tokensProvider.erc20(token.address);
        let approved = await erc20.allowance(account.address, spender);
        let desiredApproval = typeof amount === 'bigint'
            ? amount
            : _bigint_1.$bigint.toWei(amount, token.decimals);
        if (true || approved < desiredApproval) {
            return await erc20
                .$config({
                gasEstimation: true,
                type: 2,
            }, {
                retries: 0
            })
                .approve(account, spender, desiredApproval * 2n);
        }
        return null;
    }
    /**
     * @param amount Can be negative (wraps all with rest)
     */
    async wrapNativeToERC20(account, amount) {
        let amountWei = _bigint_1.$bigint.toWei(amount, 18);
        if (amountWei < 0n) {
            let balance = await this.client.getBalance(account.address);
            amountWei = balance + amountWei;
        }
        _require_1.$require.gt(amountWei, 0n);
        let depositor;
        switch (this.client.platform) {
            case 'xdai':
                depositor = a_di_1.default.resolve(WXDaiTokenContract_1.WXDaiTokenContract);
                break;
        }
        if (depositor == null) {
            throw new Error(`Wrapping depositor not found for platform ${this.client?.platform}`);
        }
        return await depositor.deposit({
            ...account,
            value: amountWei
        });
    }
    /**
     *
     */
    async unwrapNative(account, amount) {
        let depositor;
        switch (this.client.platform) {
            case 'xdai':
                depositor = a_di_1.default.resolve(WXDaiTokenContract_1.WXDaiTokenContract);
                break;
        }
        if (depositor == null) {
            throw new Error(`Wrapping depositor not found for platform ${this.client?.platform}`);
        }
        if (amount == null || amount === Infinity) {
            amount = await depositor.balanceOf(account.address);
        }
        let amountWei = typeof amount === 'number'
            ? _bigint_1.$bigint.toWei(amount, 18)
            : amount;
        console.log(amount, amountWei);
        _require_1.$require.gt(amountWei, 0n);
        return await depositor.withdraw(account, amountWei);
    }
    async getToken(mix) {
        let token = typeof mix === 'string'
            ? await this.tokensProvider.getKnownToken(mix)
            : mix;
        if (this.tokensProvider.isNative(token.address)) {
            token = {
                ...token,
                address: '0x0000000000000000000000000000000000000000',
            };
        }
        if (token == null || token.address == null) {
            throw new Error(`Address undefined: ${token}`);
        }
        return token;
    }
}
exports.TokenService = TokenService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenService, module.exports);
    } else {
        _dequanto_src_tokens_TokenService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_loggers_LoggerService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_loggers_LoggerService != null ? _dequanto_src_loggers_LoggerService : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const _date_1 = _dequanto_src_utils__date;
const everlog_1 = require("everlog");
class LoggerService {
    constructor(name = 'journal') {
        this.name = name;
        this.channel = everlog_1.Everlog.createChannel(this.name, {
            directory: './logs/dequanto/',
            columns: [
                { type: 'date', name: 'Date' },
                { type: 'string', name: 'Level' },
                { type: 'string', name: 'Message' },
            ]
        });
    }
    warn(message) {
        this.write(['Warn', message]);
    }
    error(message) {
        this.write(['Error', message]);
    }
    info(message) {
        this.write(['Info', message]);
    }
    write(row) {
        let arr = typeof row === 'string' ? [row] : row;
        let date = new Date();
        arr.unshift(date);
        this.channel.writeRow(arr);
        arr[0] = _date_1.$date.format(date, 'HH:mm:ss');
        console.log(arr.join(' '));
        return this;
    }
}
exports.LoggerService = LoggerService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_loggers_LoggerService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_loggers_LoggerService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_loggers_LoggerService, module.exports);
    } else {
        _dequanto_src_loggers_LoggerService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenTransferService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenTransferService != null ? _dequanto_src_tokens_TokenTransferService : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTransferService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TxDataBuilder_1 = _dequanto_src_txs_TxDataBuilder;
const TxWriter_1 = _dequanto_src_txs_TxWriter;
const _bigint_1 = _dequanto_src_utils__bigint;
const _is_1 = _dequanto_src_utils__is;
const TokensService_1 = _dequanto_src_tokens_TokensService;
const _address_1 = _dequanto_src_utils__address;
const _promise_1 = _dequanto_src_utils__promise;
const LoggerService_1 = _dequanto_src_loggers_LoggerService;
const _logger_1 = _dequanto_src_utils__logger;
const _account_1 = _dequanto_src_utils__account;
class TokenTransferService {
    constructor(client, logger = a_di_1.default.resolve(LoggerService_1.LoggerService)) {
        this.client = client;
        this.logger = logger;
        this.tokenService = a_di_1.default.resolve(TokensService_1.TokensService, this.client.platform);
    }
    $config(builderConfig) {
        this.builderConfig = builderConfig;
        return this;
    }
    $configWriter(writerConfig) {
        this.writerConfig = writerConfig;
        return this;
    }
    async getBalance(address, token) {
        token = await this.getToken(token);
        let isNative = this.tokenService.isNative(token.address);
        if (isNative) {
            return this.client.getBalance(address);
        }
        let erc20 = await TokensService_1.TokensService.erc20(token, this.client.platform);
        let balance = await erc20.balanceOf(address);
        return balance;
    }
    async getReceived(receipt) {
        let receiver = receipt.from;
        let ANYTOKEN = 'USDC';
        let erc20 = await TokensService_1.TokensService.erc20(ANYTOKEN, this.client.platform);
        let transfers = erc20.extractLogsTransfer(receipt);
        let transfer = transfers.find(x => _address_1.$address.eq(x.params.to, receiver));
        return transfer?.params.value ?? 0n;
    }
    /** Returns NULL for transaction, if no balance to transfer */
    async transferAll(from, to, token) {
        token = await this.getToken(token);
        let isNative = this.tokenService.isNative(token.address);
        if (isNative) {
            return this.transferNativeAll(from, to);
        }
        return this.transferErc20All(from, to, token);
    }
    async transferAllWithRemainder(from, to, token, remainder) {
        token = await this.getToken(token);
        let isNative = this.tokenService.isNative(token.address);
        if (isNative) {
            return this.transferNativeAll(from, to, { remainder });
        }
        return this.transferErc20All(from, to, token, { remainder });
    }
    async transfer(from, to, token, amount) {
        token = await this.getToken(token);
        amount = this.getAmount(amount, token);
        let isNative = this.tokenService.isNative(token.address);
        if (isNative) {
            return this.transferNative(from, to, amount);
        }
        return this.transferErc20(from, to, token, amount);
    }
    async getToken(token) {
        if (typeof token === 'string') {
            token = await this.tokenService.getKnownToken(token);
        }
        _is_1.$is.notNull(token, 'Token is undefined to transfer');
        return token;
    }
    isNativeToken(token) {
        return this.tokenService.isNative(typeof token === 'string' ? token : token.address);
    }
    async transferNativeAll(from, to, opts) {
        let buildTxRetries = 1;
        const buildTx = async () => {
            let GAS = 21000;
            let GAS_RATIO = 1.05;
            let [balance, gasPrice] = await Promise.all([
                this.client.getBalance(from.address),
                this.client.getGasPrice()
            ]);
            if (opts?.remainder != null) {
                let remainder = this.getAmount(opts.remainder, 18);
                balance -= remainder;
            }
            let $gasPrice = _bigint_1.$bigint.multWithFloat(gasPrice.price, GAS_RATIO);
            _logger_1.$logger.log(`GasPrice ${_bigint_1.$bigint.toGweiFromWei($gasPrice)}gwei`);
            let gasConsumed = BigInt(GAS) * $gasPrice;
            let transferValue = balance - gasConsumed;
            if (transferValue <= 0) {
                if (--buildTxRetries > -1) {
                    _logger_1.$logger.log(`No balance to transfer. Retry in 5s`);
                    await _promise_1.$promise.wait(5000);
                    return buildTx();
                }
                // No balance to transfer
                _logger_1.$logger.log(`No balance to transfer in ${from.address}. ${opts?.remainder ? ("Remainder: " + opts?.remainder) : ""}`);
                return null;
            }
            let txBuilder = new TxDataBuilder_1.TxDataBuilder(this.client, from, {
                to: to,
                value: _bigint_1.$bigint.toHex(transferValue)
            });
            txBuilder.data.gasPrice = _bigint_1.$bigint.toHex($gasPrice);
            // txBuilder.data.maxFeePerGas = $bigint.toHex($gasPrice - 20n**9n);
            // txBuilder.data.maxPriorityFeePerGas = $bigint.toHex(20n**9n);
            txBuilder.data.gasLimit = GAS;
            txBuilder.data.type = 1;
            txBuilder.setConfig(this.builderConfig);
            await Promise.all([
                txBuilder.setNonce({ overriding: true }),
            ]);
            _logger_1.$logger.log(`TransferNative ALL. Balance ${balance}; GasConsumed ${gasConsumed}; TransferValue ${transferValue}; Nonce: ${txBuilder.data.nonce}`);
            return txBuilder;
        };
        let txBuilder = await buildTx();
        return TxWriter_1.TxWriter.write(this.client, txBuilder, from, {
            ...(this.writerConfig ?? {}),
            retries: 3,
            async onErrorRebuild(tx, error, errCount) {
                // In case we got `balance` value, but that one was outdated, then all our calculations where wrong.
                // Retry the calculation and transfer once again.
                if (/insufficient funds/.test(error.message)) {
                    const ms = 6000 * errCount;
                    _logger_1.$logger.log(`TokenTransfer Failed: insufficient funds. Waiting ${ms}ms to retry`);
                    await _promise_1.$promise.wait(ms);
                    return buildTx();
                }
                return null;
            }
        });
    }
    async transferNative(from, to, amount) {
        let sender = _account_1.$account.getSender(from);
        let txBuilder = new TxDataBuilder_1.TxDataBuilder(this.client, sender, {
            to: to,
            value: _bigint_1.$bigint.toHex(amount)
        });
        if (sender.address) {
            await Promise.all([
                txBuilder.setGas({ priceRatio: this.gasPriorityFee, gasEstimation: true, gasLimitRatio: 1, }),
                txBuilder.setNonce(),
            ]);
        }
        txBuilder.setConfig(this.builderConfig);
        return TxWriter_1.TxWriter.write(this.client, txBuilder, from, this.writerConfig);
    }
    async transferErc20All(from, to, token, opts) {
        let erc20 = await TokensService_1.TokensService.erc20(token, this.client.platform);
        let balance = await erc20.balanceOf(from.address);
        if (opts?.remainder != null) {
            let remainder = this.getAmount(opts.remainder, 18);
            balance -= remainder;
        }
        if (balance <= 0n) {
            if (opts?.retryCount == null || opts?.retryCount !== 0) {
                // re-read
                this.logger.warn(`TransferErc20All has no balance to transfer: ${token.address}. Balance re-fetch scheduled.`);
                await _promise_1.$promise.wait(4000);
                return this.transferErc20All(from, to, token, {
                    ...(opts ?? {}),
                    retryCount: 0
                });
            }
            if (this.builderConfig.gasFunding == null) {
                return null;
            }
        }
        return erc20
            .$config(this.builderConfig, this.writerConfig)
            .transfer(from, to, balance);
    }
    async transferErc20(from, to, token, amount) {
        let erc20 = await TokensService_1.TokensService.erc20(token, this.client.platform);
        return erc20
            .$config(this.builderConfig, this.writerConfig)
            .transfer(from, to, amount);
    }
    getAmount(amount, mix) {
        if (typeof amount === 'number') {
            amount = _bigint_1.$bigint.toWei(amount, typeof mix === 'number' ? mix : mix.decimals);
        }
        return amount;
    }
}
exports.TokenTransferService = TokenTransferService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenTransferService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenTransferService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenTransferService, module.exports);
    } else {
        _dequanto_src_tokens_TokenTransferService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_chains_PlatformFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_chains_PlatformFactory != null ? _dequanto_src_chains_PlatformFactory : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformFactory = void 0;
const BlockChainExplorerProvider_1 = _dequanto_src_BlockchainExplorer_BlockChainExplorerProvider;
const ChainAccountsService_1 = _dequanto_src_ChainAccountsService;
const Web3ClientFactory_1 = _dequanto_src_clients_Web3ClientFactory;
const TokenService_1 = _dequanto_src_tokens_TokenService;
const TokensServiceFactory_1 = _dequanto_src_tokens_TokensServiceFactory;
const TokenTransferService_1 = _dequanto_src_tokens_TokenTransferService;
const memd_1 = __importDefault(require("memd"));
class PlatformFactory {
    async get(platform, opts) {
        let client = Web3ClientFactory_1.Web3ClientFactory.get(platform, opts);
        let tokens = TokensServiceFactory_1.TokensServiceFactory.get(platform);
        let explorer = BlockChainExplorerProvider_1.BlockChainExplorerProvider.get(platform);
        let accounts = new ChainAccountsService_1.ChainAccountsService();
        let transfer = new TokenTransferService_1.TokenTransferService(client);
        let token = new TokenService_1.TokenService(client);
        return {
            platform,
            client,
            tokens,
            token,
            explorer,
            accounts,
            transfer,
        };
    }
}
__decorate([
    memd_1.default.deco.memoize()
], PlatformFactory.prototype, "get", null);
exports.PlatformFactory = PlatformFactory;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_chains_PlatformFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_chains_PlatformFactory) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_chains_PlatformFactory, module.exports);
    } else {
        _dequanto_src_chains_PlatformFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CAccount;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CAccount != null ? _src_commands_list_CAccount : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAccount = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const AccountsService_1 = _src_services_AccountsService;
const _bigint_1 = _dequanto_src_utils__bigint;
const _console_1 = _src_utils__console;
const _address_1 = _dequanto_src_utils__address;
const _require_1 = _dequanto_src_utils__require;
const Paramsters_1 = _src_utils_Paramsters;
exports.CAccount = {
    command: 'account',
    description: [
        'Account tools.'
    ],
    subcommands: [
        {
            command: 'balance',
            //example: '0xweb account balance <accountName> <tokenSymbol> -p <pin>',
            description: [
                'Get account balance for ETH or any ERC20 token'
            ],
            arguments: [
                {
                    name: '<accountName>',
                    description: 'Account name added with "accounts" command',
                    required: true,
                },
                {
                    name: '<tokenSymbol>',
                    description: 'Token Symbol or Address',
                    required: true,
                }
            ],
            params: {},
            async process(args, params, app) {
                let [accountName, tokenName] = args;
                let address;
                if (_address_1.$address.isValid(accountName)) {
                    address = accountName;
                }
                else {
                    let accounts = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                    let account = await accounts.get(accountName);
                    address = account?.address;
                }
                _require_1.$require.Address(address);
                _console_1.$console.toast(`Loading token ${tokenName}`);
                let token = await app.chain.tokens.getToken(tokenName, true);
                if (token == null) {
                    throw new Error(`Unknown token: ${tokenName} for ${app.chain.client.platform}`);
                }
                _console_1.$console.toast(`Loading balance for ${address}`);
                let balance = await app.chain.token.balanceOf(address, token);
                let eth = _bigint_1.$bigint.toEther(balance, token.decimals);
                _console_1.$console.table([
                    ['Symbol', tokenName],
                    ['Address', token.address],
                    ['Decimals', token.decimals.toString()],
                    ['Balance', `green<${eth}>`]
                ]);
            }
        },
    ],
    params: {
        ...Paramsters_1.Parameters.pin,
        ...Paramsters_1.Parameters.chain,
    },
    async process(args, params, app) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CAccount === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CAccount) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CAccount, module.exports);
    } else {
        _src_commands_list_CAccount = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CReset;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CReset != null ? _src_commands_list_CReset : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CReset = void 0;
const _cli_1 = _src_utils__cli;
const _console_1 = _src_utils__console;
const atma_io_1 = require("atma-io");
exports.CReset = {
    command: 'reset',
    description: [
        'Reset various things'
    ],
    subcommands: [
        {
            command: 'accounts',
            description: [
                'Remove all accounts'
            ],
            params: {
                '--config-accounts': {
                    description: 'Optional. File path. Default is gray<%appdata%/.dequanto/accounts.json>'
                }
            },
            async process() {
                let configPathAccounts = _cli_1.$cli.getParamValue('config-accounts')
                    ?? atma_io_1.env.appdataDir.combine('./.dequanto/accounts.json').toString();
                let exists = await atma_io_1.File.existsAsync(configPathAccounts);
                if (exists === false) {
                    throw new Error(`File does not exist: ${configPathAccounts}`);
                }
                await atma_io_1.File.removeAsync(configPathAccounts);
                _console_1.$console.log(`bold<green<Accounts file removed>>`);
            }
        },
        {
            command: 'config',
            description: [
                'Remove global config file: bold<%appdata%/.dequanto/config.yml>'
            ],
            params: {},
            async process() {
                let path = atma_io_1.env.appdataDir.combine('./.dequanto/config.yml').toString();
                let exists = await atma_io_1.File.existsAsync(path);
                if (exists === false) {
                    throw new Error(`File does not exist: ${path}`);
                }
                await atma_io_1.File.removeAsync(path);
                _console_1.$console.log(`bold<green<Config file removed>>`);
            }
        }
    ],
    async process() {
        throw new Error(`Subcommand is not set`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CReset === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CReset) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CReset, module.exports);
    } else {
        _src_commands_list_CReset = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_services_PackageService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_services_PackageService != null ? _src_services_PackageService : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const atma_io_1 = require("atma-io");
class PackageService {
    constructor(chain) {
        this.chain = chain;
    }
    async getPackage(name) {
        let list = await this.list();
        let platform = this.chain.client.platform;
        return list.find(x => x.platform === platform && x.name === name);
    }
    async getBuiltIn(name) {
        let ozFiles = await atma_io_1.Directory.readFilesAsync('./dequanto/contracts/openzeppelin/', '**.ts');
        let file = ozFiles.find(x => x.uri.getName().toLowerCase() === name.toLowerCase());
        if (file == null || await file.existsAsync() === false) {
            return null;
        }
        let abi = await atma_io_1.File.readAsync(file.uri.toString().replace('.ts', '.json'));
        return {
            address: null,
            name,
            platform: this.chain.client.platform,
            main: file.uri.toString(),
            abi
        };
    }
    async list() {
        let $0xweb = await atma_io_1.File.readAsync('0xweb.json');
        let contracts = $0xweb.contracts;
        let list = [];
        for (let platform in contracts) {
            for (let address in contracts[platform]) {
                let pckg = contracts[platform][address];
                list.push({
                    platform: platform,
                    address: address,
                    name: pckg.name,
                    main: pckg.main,
                });
            }
        }
        return list;
    }
}
exports.PackageService = PackageService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_services_PackageService === module.exports) {
        // do nothing if
    } else if (__isObj(_src_services_PackageService) && __isObj(module.exports)) {
        Object.assign(_src_services_PackageService, module.exports);
    } else {
        _src_services_PackageService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractAbiProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractAbiProvider != null ? _dequanto_src_contracts_ContractAbiProvider : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractAbiProvider = void 0;
const _address_1 = _dequanto_src_utils__address;
const _require_1 = _dequanto_src_utils__require;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const _path_1 = _dequanto_src_utils__path;
const _logger_1 = _dequanto_src_utils__logger;
class ContractAbiProvider {
    constructor(client, explorer) {
        this.client = client;
        this.explorer = explorer;
    }
    async getAbi(abi, opts = null) {
        _require_1.$require.notNull(abi, `Abi not provided to get the Abi Json from`);
        let abiJson;
        let implementation;
        if (abi.startsWith('0x')) {
            let { abi: abiResult, implementation: impl } = await this.getAbiByAddress(abi, opts);
            abiJson = abiResult;
            implementation = impl;
        }
        else {
            let path = abi;
            let location = opts?.location;
            if (location && _path_1.$path.isAbsolute(path) === false) {
                // if path not relative, check the file at ClassFile location
                let relPath = atma_utils_1.class_Uri.combine(location, path);
                if (await atma_io_1.File.existsAsync(relPath)) {
                    path = relPath;
                }
            }
            let json = await atma_io_1.File.readAsync(path);
            abiJson = Array.isArray(json) ? json : json.abi;
        }
        _require_1.$require.notNull(abiJson, `Abi not resolved from ${abi}`);
        return { abiJson, implementation };
    }
    async getAbiByAddress(abi, opts) {
        let address = _address_1.$address.expectValid(abi, 'contract address is not valid');
        let platform = this.client.platform;
        let explorer = _require_1.$require.notNull(this.explorer, `Explorer not resolved for network: ${platform}`);
        try {
            _logger_1.$logger.log(`Loading contracts ABI for ${address}. `);
            let { abi, implementation } = await explorer.getContractAbi(address, opts);
            let hasProxy = _address_1.$address.eq(address, implementation) === false;
            _logger_1.$logger.log(`Proxy detected: ${hasProxy ? 'YES' : 'NO'}`, hasProxy ? implementation : '');
            let abiJson = JSON.parse(abi);
            return { abi: abiJson, implementation };
        }
        catch (error) {
            _logger_1.$logger.error(error);
            throw new Error(`ABI is not resolved from ${platform}/${address}: ${error.message ?? error}`);
        }
    }
}
exports.ContractAbiProvider = ContractAbiProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractAbiProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractAbiProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractAbiProvider, module.exports);
    } else {
        _dequanto_src_contracts_ContractAbiProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gnosis_GnosisSafe;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gnosis_GnosisSafe != null ? _dequanto_contracts_gnosis_GnosisSafe : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisSafe = void 0;
/**
 *  AUTO-Generated Class: 2022-07-07 00:45
 *  Implementation: https://etherscan.io/address/undefined#code
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
class GnosisSafe extends ContractBase_1.ContractBase {
    constructor(address = '', client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client), explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "approvedHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }], "name": "ApproveHash", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "masterCopy", "type": "address" }], "name": "ChangedMasterCopy", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" }], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract Module", "name": "module", "type": "address" }], "name": "DisabledModule", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract Module", "name": "module", "type": "address" }], "name": "EnabledModule", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256" }], "name": "ExecutionFailure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "module", "type": "address" }], "name": "ExecutionFromModuleFailure", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "module", "type": "address" }], "name": "ExecutionFromModuleSuccess", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256" }], "name": "ExecutionSuccess", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }], "name": "RemovedOwner", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }], "name": "SignMsg", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "NAME", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "addOwnerWithThreshold", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes32", "name": "hashToApprove", "type": "bytes32" }], "name": "approveHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "approvedHashes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_masterCopy", "type": "address" }], "name": "changeMasterCopy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "changeThreshold", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract Module", "name": "prevModule", "type": "address" }, { "internalType": "contract Module", "name": "module", "type": "address" }], "name": "disableModule", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "domainSeparator", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract Module", "name": "module", "type": "address" }], "name": "enableModule", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address", "name": "refundReceiver", "type": "address" }, { "internalType": "uint256", "name": "_nonce", "type": "uint256" }], "name": "encodeTransactionData", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address payable", "name": "refundReceiver", "type": "address" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" }], "name": "execTransaction", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }], "name": "execTransactionFromModule", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }], "name": "execTransactionFromModuleReturnData", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes", "name": "message", "type": "bytes" }], "name": "getMessageHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getModules", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "start", "type": "address" }, { "internalType": "uint256", "name": "pageSize", "type": "uint256" }], "name": "getModulesPaginated", "outputs": [{ "internalType": "address[]", "name": "array", "type": "address[]" }, { "internalType": "address", "name": "next", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwners", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address", "name": "refundReceiver", "type": "address" }, { "internalType": "uint256", "name": "_nonce", "type": "uint256" }], "name": "getTransactionHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "_data", "type": "bytes" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "isValidSignature", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "nonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }], "name": "removeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }], "name": "requiredTxGas", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "handler", "type": "address" }], "name": "setFallbackHandler", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_owners", "type": "address[]" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "fallbackHandler", "type": "address" }, { "internalType": "address", "name": "paymentToken", "type": "address" }, { "internalType": "uint256", "name": "payment", "type": "uint256" }, { "internalType": "address payable", "name": "paymentReceiver", "type": "address" }], "name": "setup", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "signMessage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "signedMessages", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "swapOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
    }
    // 0xa3f4df7e
    async NAME() {
        return this.$read('function NAME() returns string');
    }
    // 0xffa1ad74
    async VERSION() {
        return this.$read('function VERSION() returns string');
    }
    // 0x0d582f13
    async addOwnerWithThreshold(sender, owner, _threshold) {
        return this.$write(this.$getAbiItem('function', 'addOwnerWithThreshold'), sender, owner, _threshold);
    }
    // 0xd4d9bdcd
    async approveHash(sender, hashToApprove) {
        return this.$write(this.$getAbiItem('function', 'approveHash'), sender, hashToApprove);
    }
    // 0x7d832974
    async approvedHashes(input0, input1) {
        return this.$read('function approvedHashes(address, bytes32) returns uint256', input0, input1);
    }
    // 0x7de7edef
    async changeMasterCopy(sender, _masterCopy) {
        return this.$write(this.$getAbiItem('function', 'changeMasterCopy'), sender, _masterCopy);
    }
    // 0x694e80c3
    async changeThreshold(sender, _threshold) {
        return this.$write(this.$getAbiItem('function', 'changeThreshold'), sender, _threshold);
    }
    // 0xe009cfde
    async disableModule(sender, prevModule, module) {
        return this.$write(this.$getAbiItem('function', 'disableModule'), sender, prevModule, module);
    }
    // 0xf698da25
    async domainSeparator() {
        return this.$read('function domainSeparator() returns bytes32');
    }
    // 0x610b5925
    async enableModule(sender, module) {
        return this.$write(this.$getAbiItem('function', 'enableModule'), sender, module);
    }
    // 0xe86637db
    async encodeTransactionData(to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce) {
        return this.$read('function encodeTransactionData(address, uint256, bytes, uint8, uint256, uint256, uint256, address, address, uint256) returns bytes', to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce);
    }
    // 0x6a761202
    async execTransaction(sender, to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, signatures) {
        return this.$write(this.$getAbiItem('function', 'execTransaction'), sender, to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, signatures);
    }
    // 0x468721a7
    async execTransactionFromModule(sender, to, value, data, operation) {
        return this.$write(this.$getAbiItem('function', 'execTransactionFromModule'), sender, to, value, data, operation);
    }
    // 0x5229073f
    async execTransactionFromModuleReturnData(sender, to, value, data, operation) {
        return this.$write(this.$getAbiItem('function', 'execTransactionFromModuleReturnData'), sender, to, value, data, operation);
    }
    // 0x0a1028c4
    async getMessageHash(message) {
        return this.$read('function getMessageHash(bytes) returns bytes32', message);
    }
    // 0xb2494df3
    async getModules() {
        return this.$read('function getModules() returns address[]');
    }
    // 0xcc2f8452
    async getModulesPaginated(start, pageSize) {
        return this.$read('function getModulesPaginated(address, uint256) returns (address[],address)', start, pageSize);
    }
    // 0xa0e67e2b
    async getOwners() {
        return this.$read('function getOwners() returns address[]');
    }
    // 0xe75235b8
    async getThreshold() {
        return this.$read('function getThreshold() returns uint256');
    }
    // 0xd8d11f78
    async getTransactionHash(to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce) {
        return this.$read('function getTransactionHash(address, uint256, bytes, uint8, uint256, uint256, uint256, address, address, uint256) returns bytes32', to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, _nonce);
    }
    // 0x2f54bf6e
    async isOwner(owner) {
        return this.$read('function isOwner(address) returns bool', owner);
    }
    // 0x20c13b0b
    async isValidSignature(sender, _data, _signature) {
        return this.$write(this.$getAbiItem('function', 'isValidSignature'), sender, _data, _signature);
    }
    // 0xaffed0e0
    async nonce() {
        return this.$read('function nonce() returns uint256');
    }
    // 0xf8dc5dd9
    async removeOwner(sender, prevOwner, owner, _threshold) {
        return this.$write(this.$getAbiItem('function', 'removeOwner'), sender, prevOwner, owner, _threshold);
    }
    // 0xc4ca3a9c
    async requiredTxGas(sender, to, value, data, operation) {
        return this.$write(this.$getAbiItem('function', 'requiredTxGas'), sender, to, value, data, operation);
    }
    // 0xf08a0323
    async setFallbackHandler(sender, handler) {
        return this.$write(this.$getAbiItem('function', 'setFallbackHandler'), sender, handler);
    }
    // 0xb63e800d
    async setup(sender, _owners, _threshold, to, data, fallbackHandler, paymentToken, payment, paymentReceiver) {
        return this.$write(this.$getAbiItem('function', 'setup'), sender, _owners, _threshold, to, data, fallbackHandler, paymentToken, payment, paymentReceiver);
    }
    // 0x85a5affe
    async signMessage(sender, _data) {
        return this.$write(this.$getAbiItem('function', 'signMessage'), sender, _data);
    }
    // 0x5ae6bd37
    async signedMessages(input0) {
        return this.$read('function signedMessages(bytes32) returns uint256', input0);
    }
    // 0xe318b52b
    async swapOwner(sender, prevOwner, oldOwner, newOwner) {
        return this.$write(this.$getAbiItem('function', 'swapOwner'), sender, prevOwner, oldOwner, newOwner);
    }
    onAddedOwner(fn) {
        return this.$on('AddedOwner', fn);
    }
    onApproveHash(fn) {
        return this.$on('ApproveHash', fn);
    }
    onChangedMasterCopy(fn) {
        return this.$on('ChangedMasterCopy', fn);
    }
    onChangedThreshold(fn) {
        return this.$on('ChangedThreshold', fn);
    }
    onDisabledModule(fn) {
        return this.$on('DisabledModule', fn);
    }
    onEnabledModule(fn) {
        return this.$on('EnabledModule', fn);
    }
    onExecutionFailure(fn) {
        return this.$on('ExecutionFailure', fn);
    }
    onExecutionFromModuleFailure(fn) {
        return this.$on('ExecutionFromModuleFailure', fn);
    }
    onExecutionFromModuleSuccess(fn) {
        return this.$on('ExecutionFromModuleSuccess', fn);
    }
    onExecutionSuccess(fn) {
        return this.$on('ExecutionSuccess', fn);
    }
    onRemovedOwner(fn) {
        return this.$on('RemovedOwner', fn);
    }
    onSignMsg(fn) {
        return this.$on('SignMsg', fn);
    }
    extractLogsAddedOwner(tx) {
        let abi = this.$getAbiItem('event', 'AddedOwner');
        return this.$extractLogs(tx, abi);
    }
    extractLogsApproveHash(tx) {
        let abi = this.$getAbiItem('event', 'ApproveHash');
        return this.$extractLogs(tx, abi);
    }
    extractLogsChangedMasterCopy(tx) {
        let abi = this.$getAbiItem('event', 'ChangedMasterCopy');
        return this.$extractLogs(tx, abi);
    }
    extractLogsChangedThreshold(tx) {
        let abi = this.$getAbiItem('event', 'ChangedThreshold');
        return this.$extractLogs(tx, abi);
    }
    extractLogsDisabledModule(tx) {
        let abi = this.$getAbiItem('event', 'DisabledModule');
        return this.$extractLogs(tx, abi);
    }
    extractLogsEnabledModule(tx) {
        let abi = this.$getAbiItem('event', 'EnabledModule');
        return this.$extractLogs(tx, abi);
    }
    extractLogsExecutionFailure(tx) {
        let abi = this.$getAbiItem('event', 'ExecutionFailure');
        return this.$extractLogs(tx, abi);
    }
    extractLogsExecutionFromModuleFailure(tx) {
        let abi = this.$getAbiItem('event', 'ExecutionFromModuleFailure');
        return this.$extractLogs(tx, abi);
    }
    extractLogsExecutionFromModuleSuccess(tx) {
        let abi = this.$getAbiItem('event', 'ExecutionFromModuleSuccess');
        return this.$extractLogs(tx, abi);
    }
    extractLogsExecutionSuccess(tx) {
        let abi = this.$getAbiItem('event', 'ExecutionSuccess');
        return this.$extractLogs(tx, abi);
    }
    extractLogsRemovedOwner(tx) {
        let abi = this.$getAbiItem('event', 'RemovedOwner');
        return this.$extractLogs(tx, abi);
    }
    extractLogsSignMsg(tx) {
        let abi = this.$getAbiItem('event', 'SignMsg');
        return this.$extractLogs(tx, abi);
    }
    async getPastLogsAddedOwner(options) {
        let topic = '0x9465fa0c962cc76958e6373a993326400c1c94f8be2fe3a952adfa7f60b2ea26';
        let abi = this.$getAbiItem('event', 'AddedOwner');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsApproveHash(options) {
        let topic = '0xf2a0eb156472d1440255b0d7c1e19cc07115d1051fe605b0dce69acfec884d9c';
        let abi = this.$getAbiItem('event', 'ApproveHash');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsChangedMasterCopy(options) {
        let topic = '0x75e41bc35ff1bf14d81d1d2f649c0084a0f974f9289c803ec9898eeec4c8d0b8';
        let abi = this.$getAbiItem('event', 'ChangedMasterCopy');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsChangedThreshold(options) {
        let topic = '0x610f7ff2b304ae8903c3de74c60c6ab1f7d6226b3f52c5161905bb5ad4039c93';
        let abi = this.$getAbiItem('event', 'ChangedThreshold');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsDisabledModule(options) {
        let topic = '0xaab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace4054276';
        let abi = this.$getAbiItem('event', 'DisabledModule');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsEnabledModule(options) {
        let topic = '0xecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440';
        let abi = this.$getAbiItem('event', 'EnabledModule');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsExecutionFailure(options) {
        let topic = '0x23428b18acfb3ea64b08dc0c1d296ea9c09702c09083ca5272e64d115b687d23';
        let abi = this.$getAbiItem('event', 'ExecutionFailure');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsExecutionFromModuleFailure(options) {
        let topic = '0xacd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375';
        let abi = this.$getAbiItem('event', 'ExecutionFromModuleFailure');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsExecutionFromModuleSuccess(options) {
        let topic = '0x6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8';
        let abi = this.$getAbiItem('event', 'ExecutionFromModuleSuccess');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsExecutionSuccess(options) {
        let topic = '0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e';
        let abi = this.$getAbiItem('event', 'ExecutionSuccess');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsRemovedOwner(options) {
        let topic = '0xf8d49fc529812e9a7c5c50e69c20f0dccc0db8fa95c98bc58cc9a4f1c1299eaf';
        let abi = this.$getAbiItem('event', 'RemovedOwner');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsSignMsg(options) {
        let topic = '0xe7f4675038f4f6034dfcbbb24c4dc08e4ebf10eb9d257d3d02c0f38d122ac6e4';
        let abi = this.$getAbiItem('event', 'SignMsg');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
}
exports.GnosisSafe = GnosisSafe;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gnosis_GnosisSafe === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gnosis_GnosisSafe) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gnosis_GnosisSafe, module.exports);
    } else {
        _dequanto_contracts_gnosis_GnosisSafe = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_safe_transport_FileServiceTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_safe_transport_FileServiceTransport != null ? _dequanto_src_safe_transport_FileServiceTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileServiceTransport = void 0;
const GnosisSafe_1 = _dequanto_contracts_gnosis_GnosisSafe;
const atma_io_1 = require("atma-io");
const _address_1 = _dequanto_src_utils__address;
class FileServiceTransport {
    constructor(client, owner, path) {
        this.client = client;
        this.owner = owner;
        this.path = path;
    }
    async getTx(safeTxHash) {
        let current = await this.get();
        let tx = current.find(x => x.safeTxHash === safeTxHash);
        if (tx == null) {
            throw new Error(`Safe Tx not found in ${this.path}`);
        }
        return tx;
    }
    async getTxConfirmations(safeTxHash) {
        let tx = await this.getTx(safeTxHash);
        let confirmations = tx.confirmations ?? [];
        return {
            count: confirmations.length,
            results: confirmations
        };
    }
    async confirmTx(safeTxHash, sig) {
        let arr = await this.get();
        let tx = arr.find(x => x.safeTxHash === safeTxHash);
        if (tx == null) {
            throw new Error(`Safe Tx not found in ${this.path}`);
        }
        let confirmations = tx.confirmations;
        if (confirmations == null) {
            confirmations = tx.confirmations = [];
        }
        let currentSig = confirmations.find(x => _address_1.$address.eq(x.owner, sig.owner));
        if (currentSig) {
            // already signed
            return currentSig;
        }
        let innerSig = {
            owner: sig.owner,
            signature: sig.signature
        };
        confirmations.push(innerSig);
        await this.save(arr);
        return sig;
    }
    async getSafeInfo(safeAddress) {
        let contract = new GnosisSafe_1.GnosisSafe(safeAddress, this.client);
        let [nonce, threshold] = await Promise.all([
            contract.nonce(),
            contract.getThreshold(),
        ]);
        return { nonce, threshold };
    }
    async estimateSafeTransaction(safeAddress, safeTxEstimation) {
        return {
            safeTxGas: '0x0'
        };
    }
    async proposeTransaction(args) {
        let arr = await this.get();
        let current = arr.find(x => x.safeTxHash === args.safeTxHash);
        if (current) {
            //already created
            return;
        }
        arr.push({
            ...args.safeTransaction.data,
            safe: args.safeAddress,
            safeTxHash: args.safeTxHash,
            confirmations: [],
        });
        await this.save(arr);
    }
    async get() {
        try {
            return await atma_io_1.File.readAsync(this.path, { cached: false });
        }
        catch (error) {
            return [];
        }
    }
    async save(arr) {
        await atma_io_1.File.writeAsync(this.path, arr);
    }
}
exports.FileServiceTransport = FileServiceTransport;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_safe_transport_FileServiceTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_safe_transport_FileServiceTransport) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_safe_transport_FileServiceTransport, module.exports);
    } else {
        _dequanto_src_safe_transport_FileServiceTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_services_ContractService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_services_ContractService != null ? _src_services_ContractService : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const atma_io_1 = require("atma-io");
const PackageService_1 = _src_services_PackageService;
const GeneratorFromAbi_1 = _dequanto_src_gen_GeneratorFromAbi;
const _cli_1 = _src_utils__cli;
const _console_1 = _src_utils__console;
const ContractReader_1 = _dequanto_src_contracts_ContractReader;
const TxTopicInMemoryProvider_1 = _dequanto_src_txs_receipt_TxTopicInMemoryProvider;
const ContractWriter_1 = _dequanto_src_contracts_ContractWriter;
const AccountsService_1 = _src_services_AccountsService;
const PlatformFactory_1 = _dequanto_src_chains_PlatformFactory;
const _require_1 = _dequanto_src_utils__require;
const memd_1 = __importDefault(require("memd"));
const ContractAbiProvider_1 = _dequanto_src_contracts_ContractAbiProvider;
const FileServiceTransport_1 = _dequanto_src_safe_transport_FileServiceTransport;
const _account_1 = _dequanto_src_utils__account;
class ContractService {
    constructor(app) {
        this.app = app;
    }
    async help(name) {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);
        let methods = await abi.filter(x => x.type === 'function');
        let reads = methods.filter(x => GeneratorFromAbi_1.GeneratorFromAbi.Gen.isReader(x));
        let writes = methods.filter(x => GeneratorFromAbi_1.GeneratorFromAbi.Gen.isReader(x) === false);
        let lines = [
            `bold<cyan<${atma_io_1.env.currentDir.combine(pckg.main).toLocalFile()}>>`
        ];
        lines.push(`bold<Read>`);
        lines.push(...reads.map(this.stringifyAbi));
        lines.push('');
        lines.push(`bold<Write>`);
        lines.push(...writes.map(this.stringifyAbi));
        return lines.join('\n');
    }
    async call(name, method, params) {
        let pckg = await this.getPackage(name);
        let abi = await this.getAbi(pckg);
        let abiItem = abi.find(x => x.name === method && x.type === 'function');
        if (abiItem == null) {
            throw new Error(`Method ${method} not found. gray<0xweb c abi <name>> to view available methods`);
        }
        let methodSignature = this.stringifyAbi(abiItem);
        let isRead = await GeneratorFromAbi_1.GeneratorFromAbi.Gen.isReader(abiItem);
        let platform = params.chain ?? pckg.platform;
        if (platform !== this.app?.chain?.client.platform) {
            this.app.chain = await a_di_1.default
                .resolve(PlatformFactory_1.PlatformFactory)
                .get(platform);
        }
        _console_1.$console.log('');
        _console_1.$console.table([
            ['Contract', params.address ?? pckg.address],
            ['Platform', platform],
            ['Action', isRead ? 'READ' : 'WRITE'],
            ['Method', methodSignature.trim()],
        ]);
        _console_1.$console.log('');
        if (isRead) {
            await this.$read(pckg, abiItem, params);
        }
        else {
            await this.$write(pckg, abiItem, params);
        }
    }
    async getAbiByAddress(address, client, explorer) {
        let resolver = new ContractAbiProvider_1.ContractAbiProvider(client, explorer);
        let result = await resolver.getAbi(address);
        return result.abiJson;
    }
    async $read(pckg, abi, params) {
        let address = params.address ?? pckg.address;
        _require_1.$require.Address(address, 'Contracts address invalid');
        let args = await this.getArguments(abi, params);
        let reader = await this.getContractReader(params);
        let result = await reader.readAsync(address, abi, ...args);
        _console_1.$console.log(result);
    }
    async getContractReader(params) {
        let reader = a_di_1.default.resolve(ContractReader_1.ContractReader, this.app.chain.client);
        if (params.block) {
            reader.forBlock(Number(params.block));
        }
        return reader;
    }
    async $write(pckg, abi, params) {
        let args = await this.getArguments(abi, params);
        let writer = await this.getContractWriter(pckg, abi, params);
        let accounts = a_di_1.default.resolve(AccountsService_1.AccountsService, this.app.config);
        let account = await accounts.get(params.account);
        let writerConfig = {};
        if (_account_1.$account.isSafe(account) && params.safeTransport) {
            let sender = _account_1.$account.getSender(account);
            if (sender.key == null) {
                sender = await accounts.get(sender.address ?? sender.name);
            }
            writerConfig.safeTransport = new FileServiceTransport_1.FileServiceTransport(this.app.chain.client, sender, params.safeTransport);
        }
        let tx = await writer.writeAsync(account, abi, args, {
            builderConfig: {
                nonce: params.nonce
            },
            writerConfig,
        });
        let receipt = await tx.onCompleted;
        _console_1.$console.log(!receipt.status ? `red<bold<Failed>>` : `green<bold<OK>> ${receipt.transactionHash}`);
    }
    async getContractWriter(pckg, abi, params) {
        let logParser = a_di_1.default.resolve(TxTopicInMemoryProvider_1.TxTopicInMemoryProvider);
        logParser.register(abi);
        let writer = a_di_1.default.resolve(ContractWriter_1.ContractWriter, params.address ?? pckg.address, this.app.chain.client);
        return writer;
    }
    async getArguments(abi, params) {
        let args = await (0, alot_1.default)(abi.inputs).mapAsync(async (x) => {
            return this.getArgument(x, params);
        }).toArrayAsync({ threads: 1 });
        return args;
    }
    async getArgument(abi, params) {
        if (abi.components != null) {
            _console_1.$console.log('gray<Object input>');
            _console_1.$console.table(abi.components.map(x => {
                return [x.name, x.type];
            }));
            let obj = {};
            for (let key in params) {
                let keyPrfx = `${abi.name}.`;
                if (key.startsWith(keyPrfx)) {
                    let subKey = key.replace(keyPrfx, '');
                    obj[subKey] = params[key];
                }
            }
            let arr = await (0, alot_1.default)(abi.components).mapAsync(async (x) => {
                let value = await this.getArgument(x, obj);
                return {
                    key: x.name,
                    value: value
                };
            }).toArrayAsync({ threads: 1 });
            return (0, alot_1.default)(arr).toDictionary(x => x.key, x => x.value);
        }
        let val = params[abi.name];
        if (val != null) {
            return val;
        }
        return _cli_1.$cli.ask(`Value for bold<${abi.name}> gray<(>bold<blue<${abi.type}>>gray<)>: `, abi.type);
    }
    async getPackage(name) {
        let packageService = a_di_1.default.resolve(PackageService_1.PackageService, this.app.chain);
        let pckg = await packageService.getPackage(name);
        if (pckg == null) {
            pckg = await packageService.getBuiltIn(name);
            if (pckg == null) {
                throw new Error(`Package ${name} not found. gray<0xweb c list> to view all installed contracts`);
            }
        }
        return pckg;
    }
    async getAbi(pckg) {
        let abi = await atma_io_1.File.readAsync(pckg.main.replace('.ts', '.json'));
        return abi;
    }
    stringifyAbi(abi) {
        let str = GeneratorFromAbi_1.GeneratorFromAbi.Gen.serializeMethodAbi(abi, true);
        let line = '  ' + str.replace('function', '').trim();
        line = line.replace('returns', 'gray<returns>');
        line = line.replace(/(address|string|u?int\d+|bytes)/g, 'bold<blue<$1>>');
        line = line.replace(/([()])/g, 'green<$1>');
        return line;
    }
}
__decorate([
    memd_1.default.deco.memoize({
        keyResolver(address, client, explorer) {
            return `${client.platform}:${address}`;
        },
        persistance: new memd_1.default.FsTransport({
            path: atma_io_1.env.appdataDir.combine('./0xweb/cache/contracts.json')
        })
    })
], ContractService.prototype, "getAbiByAddress", null);
exports.ContractService = ContractService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_services_ContractService === module.exports) {
        // do nothing if
    } else if (__isObj(_src_services_ContractService) && __isObj(module.exports)) {
        Object.assign(_src_services_ContractService, module.exports);
    } else {
        _src_services_ContractService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CContract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CContract != null ? _src_commands_list_CContract : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CContract = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractService_1 = _src_services_ContractService;
const _console_1 = _src_utils__console;
const Paramsters_1 = _src_utils_Paramsters;
exports.CContract = {
    command: 'c, contract',
    description: [
        `Contract actions`
    ],
    subcommands: [
        {
            command: 'abi',
            description: ['List of the available READ and WRITE methods for the contract'],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                }
            ],
            params: {},
            async process(args, params, app) {
                let [name] = args;
                let service = a_di_1.default.resolve(ContractService_1.ContractService, app);
                let str = await service.help(name);
                _console_1.$console.log(str);
            }
        },
        {
            command: 'read',
            description: ['READ contract. Parameters are resolved by cli flags or will be prompted.'],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                },
                {
                    description: 'Method name',
                    required: true
                },
            ],
            params: {
                '-b, --block': {
                    description: 'Default: Latest. If archive node is used, READ actions can be performed at specified block number.'
                },
                '-c, --chain': {
                    description: `Default: The chain will be taken from the installed contract. `
                },
                '--address': {
                    description: `Overwrite contracts address.`
                },
            },
            async process(args, params, app) {
                let [name, method] = args;
                let service = a_di_1.default.resolve(ContractService_1.ContractService, app);
                await service.call(name, method, params);
            }
        },
        {
            command: 'write',
            description: ['Send a Transaction. Parameters are resolved by cli flags or will be prompted.'],
            arguments: [
                {
                    description: 'Installed contract by name',
                    required: true
                },
                {
                    description: 'Method name',
                    required: true
                }
            ],
            params: {
                '-c, --chain': {
                    description: `Default: The chain will be taken from the installed contract. `
                },
                ...Paramsters_1.Parameters.account(),
                ...Paramsters_1.Parameters.pin,
                '--nonce': {
                    description: 'Override nonce',
                    type: 'number'
                },
                '--safe-transport': {
                    description: `Optionally the file path for multisig signatures, if collected manually, as per default Gnosis Safe Service is used.`,
                },
            },
            async process(args, params, app) {
                let [name, method] = args;
                let service = a_di_1.default.resolve(ContractService_1.ContractService, app);
                await service.call(name, method, params);
            }
        },
    ],
    async process(args, params) {
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CContract === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CContract) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CContract, module.exports);
    } else {
        _src_commands_list_CContract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__path;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__path != null ? _src_utils__path : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$path = void 0;
const atma_utils_1 = require("atma-utils");
var $path;
(function ($path) {
    const __root = __dirname.replace(/[\\\/](lib|src).*$/, '');
    function resolve(path) {
        return `file://` + atma_utils_1.class_Uri.combine(__root, path);
    }
    $path.resolve = resolve;
})($path = exports.$path || (exports.$path = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__path === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__path) && __isObj(module.exports)) {
        Object.assign(_src_utils__path, module.exports);
    } else {
        _src_utils__path = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CInit;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CInit != null ? _src_commands_list_CInit : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CInit = void 0;
const atma_io_1 = require("atma-io");
const shellbee_1 = require("shellbee");
const atma_utils_1 = require("atma-utils");
const _console_1 = _src_utils__console;
const _path_1 = _src_utils__path;
exports.CInit = {
    command: 'init',
    description: [
        'Clone dequanto sources and configure aliases in tsconfig'
    ],
    params: {
        '-d, --dir': {
            description: 'Target directory. Default: current working directory'
        },
        '-s, --source': {
            description: 'Values: git, npm. If "git" - dequanto repo will be installed as a submodule, if "npm" - dequanto will be installed as node_module'
        },
        '--hardhat': {
            description: 'Initialize also Hardhat project',
            type: 'boolean'
        }
    },
    async process(args, params) {
        let cwd = new atma_utils_1.class_Uri(`file://${process.cwd()}/`);
        let directory;
        if (params.dir) {
            directory = new atma_utils_1.class_Uri(params.dir + '/');
            if (directory.isRelative()) {
                directory = cwd.combine(directory);
            }
            await atma_io_1.Directory.ensureAsync(directory.toString());
        }
        else {
            directory = cwd;
        }
        _console_1.$console.log(`Prepair dequanto package in bold<${directory.toLocalDir()}>`);
        let worker = new InitWorker(directory, params);
        await worker.init();
    }
};
class InitWorker {
    constructor(directory, params) {
        this.directory = directory;
        this.params = params;
        this.repo = `https://github.com/0xweb-org/dequanto.git`;
    }
    async init() {
        await this.ensureGit();
        await this.ensurePackageJson();
        await this.ensureDequanto();
        await this.ensureTsConfig();
        await this.ensureDependencies();
        await this.ensureHardhatConfig();
        _console_1.$console.log(`green<bold<Completed>>`);
    }
    getPathDequanto(path) {
        let isNpm = this.params.source === 'npm';
        let uri = this.directory.combine(isNpm ? './node_modules/dequanto/' : './dequanto/');
        if (path != null) {
            uri = uri.combine(path);
        }
        return uri.toString();
    }
    async ensureDequanto() {
        if (this.params.source === 'npm') {
            await this.ensureDequantoFromNpm();
            return;
        }
        await this.ensureDequantoFromGit();
    }
    async ensureDequantoFromNpm() {
        let hasDependency = await atma_io_1.Directory.existsAsync(this.getPathDequanto());
        if (hasDependency) {
            return;
        }
        await (0, shellbee_1.run)({
            command: `npm install dequanto`,
            cwd: this.directory.toLocalDir(),
        });
    }
    async ensureDequantoFromGit() {
        let hasRepo = await atma_io_1.Directory.existsAsync(this.getPathDequanto());
        if (hasRepo) {
            return;
        }
        await (0, shellbee_1.run)({
            command: `git submodule add ${this.repo}`,
            cwd: this.directory.toLocalDir(),
        });
    }
    async ensureGit() {
        _console_1.$console.toast('Check git repository');
        let hasGit = await atma_io_1.Directory.existsAsync(this.directory.combine('./.git/').toString());
        if (hasGit) {
            return;
        }
        _console_1.$console.toast('Initialize git repository');
        await (0, shellbee_1.run)({
            command: 'git init',
            cwd: this.directory.toLocalDir(),
        });
        await this.ensureFile('./.gitignore', {
            create() {
                return [
                    'node_modules'
                ].join('\n');
            },
            edit(content) {
                return null;
            }
        });
    }
    async ensurePackageJson() {
        let path = this.directory.combine('./package.json');
        let file = new atma_io_1.File(path);
        let pckg = {};
        let exists = await file.existsAsync();
        if (exists) {
            pckg = await file.readAsync();
        }
        let modified = extendWithDefaultValues(pckg, {
            "atma": {
                "plugins": [
                    "atma-loader-ts"
                ],
                "settings": {
                    "include": {
                        "amd": true,
                        "extentionDefault": {
                            "js": "ts"
                        },
                        "routes": "#import ./tsconfig.json compilerOptions.paths"
                    },
                    "atma-loader-ts": {
                        "sourceMap": true,
                        "typescript": "#import ./tsconfig.json"
                    }
                }
            }
        });
        if (exists === false || modified === true) {
            await file.writeAsync(pckg);
        }
        function extendWithDefaultValues(target, source) {
            let modified = false;
            for (let key in source) {
                let val = source[key];
                if (target[key] == null) {
                    target[key] = val;
                    modified = true;
                    continue;
                }
                if (Array.isArray(val) && val.length > 0) {
                    let targetArr = target[key];
                    if (Array.isArray(targetArr) === false) {
                        console.dir(targetArr, { depth: null });
                        throw new Error(`Target value in ${key} is not an array`);
                    }
                    for (let item of val) {
                        if (typeof item === 'object') {
                            console.dir(item, { depth: null });
                            throw new Error(`Not implemented. Only strings in array are supported`);
                        }
                        if (targetArr.includes(item) === false) {
                            modified = true;
                            targetArr.push(item);
                        }
                    }
                    continue;
                }
                if (typeof val === 'object') {
                    let targetObj = target[key];
                    if (typeof targetObj !== 'object') {
                        if (typeof targetObj === 'string' && targetObj.startsWith('#import')) {
                            // using appcfg partial loaders, dismiss for now, @todo for the future - follow the link, and extend values there
                            continue;
                        }
                        console.dir(targetObj, { depth: null });
                        throw new Error(`Target value in ${key} is not an object`);
                    }
                    let $modified = extendWithDefaultValues(targetObj, val);
                    modified = $modified || modified;
                }
            }
            return modified;
        }
    }
    async ensureDependencies() {
        _console_1.$console.toast('Check and install required dequanto dependencies');
        let filePackageCurrent = new atma_io_1.File(this.directory.combine('./package.json'));
        let filePackageDequanto = new atma_io_1.File(this.directory.combine('./dequanto/package.json'));
        let [pckgDequanto, pckgCurrent] = await Promise.all([
            filePackageDequanto.readAsync(),
            filePackageCurrent.readAsync()
        ]);
        if (pckgCurrent.dependencies == null) {
            pckgCurrent.dependencies = {};
        }
        let requiredDeps = pckgDequanto.dependencies;
        if (this.params.hardhat) {
            requiredDeps = {
                ...requiredDeps,
                'hardhat': 'latest',
                '@nomiclabs/hardhat-web3': 'latest',
                '@nomiclabs/hardhat-waffle': 'latest',
                '@nomiclabs/hardhat-etherscan': 'latest',
                '@0xweb/hardhat': 'latest'
            };
        }
        let added = [];
        let deps = pckgCurrent.dependencies;
        for (let name in requiredDeps) {
            if (name in deps === false) {
                deps[name] = requiredDeps[name];
                added.push(name);
            }
        }
        if (added.length === 0) {
            _console_1.$console.toast(`Required dependencies are already bold<green<installed>>`);
            return;
        }
        _console_1.$console.log(`Extending gray<package.json> with new dependencies: \n ${added.map(x => `   bold<${x}>`).join('\n')}`);
        await filePackageCurrent.writeAsync(pckgCurrent);
        _console_1.$console.log(`Starting gray<npm install>`);
        await (0, shellbee_1.run)({
            command: 'npm install',
            cwd: this.directory.toLocalDir(),
        });
    }
    async ensureTsConfig() {
        _console_1.$console.toast('Check tsconfig.json');
        let path = this.directory.combine('./tsconfig.json');
        let file = new atma_io_1.File(path);
        let pckg = await file.existsAsync()
            ? await file.readAsync()
            : {};
        if (pckg.compilerOptions == null) {
            pckg.compilerOptions = {
                "baseUrl": "./",
                "declaration": true,
                "target": "ES2020",
                "module": "AMD",
                "sourceMap": false,
                "experimentalDecorators": true,
                "esModuleInterop": true,
                "allowSyntheticDefaultImports": true,
                "moduleResolution": "node",
            };
        }
        if (pckg.compilerOptions.paths == null) {
            pckg.compilerOptions.paths = {};
        }
        if (pckg.compilerOptions.paths['@dequanto/*'] != null) {
            return;
        }
        if (pckg.compilerOptions.baseUrl == null) {
            pckg.compilerOptions.baseUrl = './';
        }
        if (pckg.compilerOptions.moduleResolution == null) {
            pckg.compilerOptions.moduleResolution = 'node';
        }
        let isNpm = this.params.source === 'npm';
        pckg.compilerOptions.paths['@dequanto/*'] = isNpm
            ? ["node_modules/dequanto/src/*"]
            : ["dequanto/src/*"];
        pckg.compilerOptions.paths['@dequanto-contracts/*'] = isNpm
            ? ["node_modules/dequanto/contracts/*"]
            : ["dequanto/contracts/*"];
        pckg.compilerOptions.paths['@0xweb/*'] = ["0xweb/*"];
        _console_1.$console.toast('Save modified tsconfig');
        await file.writeAsync(pckg);
    }
    async ensureHardhatConfig() {
        const template = await atma_io_1.File.readAsync(_path_1.$path.resolve('/templates/hardhat.config.js'), { skipHooks: true });
        await this.ensureFile(`hardhat.config.js`, {
            create() {
                return template;
            },
            edit(content) {
                let requires = template
                    .split('\n')
                    .map(line => /require\("(?<name>[^"]+)"\)/.exec(line))
                    .filter(x => x != null)
                    .map(x => x.groups.name)
                    .filter(name => content.includes(name) === false)
                    .map(name => `require("${name}")`)
                    .join(atma_io_1.env.newLine);
                return requires + atma_io_1.env.newLine + content;
            }
        });
    }
    async ensureFile(filename, handler) {
        if (await atma_io_1.File.existsAsync(filename) === false) {
            let content = await handler.create();
            await atma_io_1.File.writeAsync(filename, content, { skipHooks: true });
            return;
        }
        let current = await atma_io_1.File.readAsync(filename, { skipHooks: true });
        let modified = await handler.edit(current);
        if (modified != null && modified !== current) {
            await atma_io_1.File.writeAsync(filename, modified, { skipHooks: true });
            return;
        }
    }
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CInit === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CInit) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CInit, module.exports);
    } else {
        _src_commands_list_CInit = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase != null ? _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmFactoryV2ContractBase = void 0;
/**
 *  AUTO-Generated Class: 2021-11-09 14:26
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
class AmmFactoryV2ContractBase extends ContractBase_1.ContractBase {
    constructor(address = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [], "name": "INIT_CODE_PAIR_HASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
    }
    async INIT_CODE_PAIR_HASH() {
        return this.$read('function INIT_CODE_PAIR_HASH() returns bytes32');
    }
    async allPairs(input0) {
        return this.$read('function allPairs(uint256) returns address', input0);
    }
    async allPairsLength() {
        return this.$read('function allPairsLength() returns uint256');
    }
    async createPair(eoa, tokenA, tokenB) {
        return this.$write('function createPair(address, address) returns address pair', eoa, tokenA, tokenB);
    }
    async feeTo() {
        return this.$read('function feeTo() returns address');
    }
    async feeToSetter() {
        return this.$read('function feeToSetter() returns address');
    }
    async getPair(input0, input1) {
        return this.$read('function getPair(address, address) returns address', input0, input1);
    }
    async setFeeTo(eoa, _feeTo) {
        return this.$write('function setFeeTo(address)', eoa, _feeTo);
    }
    async setFeeToSetter(eoa, _feeToSetter) {
        return this.$write('function setFeeToSetter(address)', eoa, _feeToSetter);
    }
    onPairCreated(fn) {
        return this.$on('PairCreated', fn);
    }
}
exports.AmmFactoryV2ContractBase = AmmFactoryV2ContractBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_amm_AmmFactoryV2ContractBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_amm_AmmFactoryV2ContractBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_amm_AmmFactoryV2ContractBase, module.exports);
    } else {
        _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract != null ? _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract : {};
    var module = { exports: exports };

    "use strict";
/**
 * dequanto
 * name: AmmFactoryV2ContractBase
 * platform: bsc
 * source.abi: 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
 * output: ./contracts/gen/amm/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmFactoryV2Contract = void 0;
const AmmFactoryV2ContractBase_1 = _dequanto_contracts_gen_amm_AmmFactoryV2ContractBase;
/* https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/factory-v2 */
class AmmFactoryV2Contract extends AmmFactoryV2ContractBase_1.AmmFactoryV2ContractBase {
}
exports.AmmFactoryV2Contract = AmmFactoryV2Contract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase != null ? _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmMasterChefV2ContractBase = void 0;
/**
 *  AUTO-Generated Class: 2021-11-09 14:26
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
class AmmMasterChefV2ContractBase extends ContractBase_1.ContractBase {
    constructor(address = '0x73feaa1eE314F8c655E354234017bE2193C9E24E', client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "contract CakeToken", "name": "_cake", "type": "address" }, { "internalType": "contract SyrupBar", "name": "_syrup", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "uint256", "name": "_cakePerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "cake", "outputs": [{ "internalType": "contract CakeToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cakePerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "enterStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "leaveStaking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "migrate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "migrator", "outputs": [{ "internalType": "contract IMigratorChef", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingCake", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accCakePerShare", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IMigratorChef", "name": "_migrator", "type": "address" }], "name": "setMigrator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "syrup", "outputs": [{ "internalType": "contract SyrupBar", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "multiplierNumber", "type": "uint256" }], "name": "updateMultiplier", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    }
    async BONUS_MULTIPLIER() {
        return this.$read('function BONUS_MULTIPLIER() returns uint256');
    }
    async add(eoa, _allocPoint, _lpToken, _withUpdate) {
        return this.$write('function add(uint256, address, bool)', eoa, _allocPoint, _lpToken, _withUpdate);
    }
    async cake() {
        return this.$read('function cake() returns address');
    }
    async cakePerBlock() {
        return this.$read('function cakePerBlock() returns uint256');
    }
    async deposit(eoa, _pid, _amount) {
        return this.$write('function deposit(uint256, uint256)', eoa, _pid, _amount);
    }
    async dev(eoa, _devaddr) {
        return this.$write('function dev(address)', eoa, _devaddr);
    }
    async devaddr() {
        return this.$read('function devaddr() returns address');
    }
    async emergencyWithdraw(eoa, _pid) {
        return this.$write('function emergencyWithdraw(uint256)', eoa, _pid);
    }
    async enterStaking(eoa, _amount) {
        return this.$write('function enterStaking(uint256)', eoa, _amount);
    }
    async getMultiplier(_from, _to) {
        return this.$read('function getMultiplier(uint256, uint256) returns uint256', _from, _to);
    }
    async leaveStaking(eoa, _amount) {
        return this.$write('function leaveStaking(uint256)', eoa, _amount);
    }
    async massUpdatePools(eoa) {
        return this.$write('function massUpdatePools()', eoa);
    }
    async migrate(eoa, _pid) {
        return this.$write('function migrate(uint256)', eoa, _pid);
    }
    async migrator() {
        return this.$read('function migrator() returns address');
    }
    async owner() {
        return this.$read('function owner() returns address');
    }
    async pendingCake(_pid, _user) {
        return this.$read('function pendingCake(uint256, address) returns uint256', _pid, _user);
    }
    async poolInfo(input0) {
        return this.$read('function poolInfo(uint256) returns (address lpToken,uint256 allocPoint,uint256 lastRewardBlock,uint256 accCakePerShare)', input0);
    }
    async poolLength() {
        return this.$read('function poolLength() returns uint256');
    }
    async renounceOwnership(eoa) {
        return this.$write('function renounceOwnership()', eoa);
    }
    async set(eoa, _pid, _allocPoint, _withUpdate) {
        return this.$write('function set(uint256, uint256, bool)', eoa, _pid, _allocPoint, _withUpdate);
    }
    async setMigrator(eoa, _migrator) {
        return this.$write('function setMigrator(address)', eoa, _migrator);
    }
    async startBlock() {
        return this.$read('function startBlock() returns uint256');
    }
    async syrup() {
        return this.$read('function syrup() returns address');
    }
    async totalAllocPoint() {
        return this.$read('function totalAllocPoint() returns uint256');
    }
    async transferOwnership(eoa, newOwner) {
        return this.$write('function transferOwnership(address)', eoa, newOwner);
    }
    async updateMultiplier(eoa, multiplierNumber) {
        return this.$write('function updateMultiplier(uint256)', eoa, multiplierNumber);
    }
    async updatePool(eoa, _pid) {
        return this.$write('function updatePool(uint256)', eoa, _pid);
    }
    async userInfo(input0, input1) {
        return this.$read('function userInfo(uint256, address) returns (uint256 amount,uint256 rewardDebt)', input0, input1);
    }
    async withdraw(eoa, _pid, _amount) {
        return this.$write('function withdraw(uint256, uint256)', eoa, _pid, _amount);
    }
    onDeposit(fn) {
        return this.$on('Deposit', fn);
    }
    onEmergencyWithdraw(fn) {
        return this.$on('EmergencyWithdraw', fn);
    }
    onOwnershipTransferred(fn) {
        return this.$on('OwnershipTransferred', fn);
    }
    onWithdraw(fn) {
        return this.$on('Withdraw', fn);
    }
}
exports.AmmMasterChefV2ContractBase = AmmMasterChefV2ContractBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase, module.exports);
    } else {
        _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract != null ? _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract : {};
    var module = { exports: exports };

    "use strict";
/**
 * dequanto
 * name: AmmMasterChefV2ContractBase
 * platform: bsc
 * source.abi: 0x73feaa1eE314F8c655E354234017bE2193C9E24E
 * output: ./contracts/gen/amm/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmMasterChefV2Contract = void 0;
const AmmMasterChefV2ContractBase_1 = _dequanto_contracts_gen_amm_AmmMasterChefV2ContractBase;
/* https://docs.pancakeswap.finance/code/smart-contracts/main-staking-masterchef-contract */
class AmmMasterChefV2Contract extends AmmMasterChefV2ContractBase_1.AmmMasterChefV2ContractBase {
}
exports.AmmMasterChefV2Contract = AmmMasterChefV2Contract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_amm_AmmPairContractV2Base;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_amm_AmmPairContractV2Base != null ? _dequanto_contracts_gen_amm_AmmPairContractV2Base : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmPairContractV2Base = void 0;
/**
 *  AUTO-Generated Class: 2021-11-09 14:26
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
class AmmPairContractV2Base extends ContractBase_1.ContractBase {
    constructor(address = '0x7752e1fa9f3a2e860856458517008558deb989e3', client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
    }
    async DOMAIN_SEPARATOR() {
        return this.$read('function DOMAIN_SEPARATOR() returns bytes32');
    }
    async MINIMUM_LIQUIDITY() {
        return this.$read('function MINIMUM_LIQUIDITY() returns uint256');
    }
    async PERMIT_TYPEHASH() {
        return this.$read('function PERMIT_TYPEHASH() returns bytes32');
    }
    async allowance(input0, input1) {
        return this.$read('function allowance(address, address) returns uint256', input0, input1);
    }
    async approve(eoa, spender, value) {
        return this.$write('function approve(address, uint256) returns bool', eoa, spender, value);
    }
    async balanceOf(input0) {
        return this.$read('function balanceOf(address) returns uint256', input0);
    }
    async burn(eoa, to) {
        return this.$write('function burn(address) returns (uint256 amount0,uint256 amount1)', eoa, to);
    }
    async decimals() {
        return this.$read('function decimals() returns uint8');
    }
    async factory() {
        return this.$read('function factory() returns address');
    }
    async getReserves() {
        return this.$read('function getReserves() returns (uint112 _reserve0,uint112 _reserve1,uint32 _blockTimestampLast)');
    }
    async initialize(eoa, _token0, _token1) {
        return this.$write('function initialize(address, address)', eoa, _token0, _token1);
    }
    async kLast() {
        return this.$read('function kLast() returns uint256');
    }
    async mint(eoa, to) {
        return this.$write('function mint(address) returns uint256 liquidity', eoa, to);
    }
    async name() {
        return this.$read('function name() returns string');
    }
    async nonces(input0) {
        return this.$read('function nonces(address) returns uint256', input0);
    }
    async permit(eoa, owner, spender, value, deadline, v, r, s) {
        return this.$write('function permit(address, address, uint256, uint256, uint8, bytes32, bytes32)', eoa, owner, spender, value, deadline, v, r, s);
    }
    async price0CumulativeLast() {
        return this.$read('function price0CumulativeLast() returns uint256');
    }
    async price1CumulativeLast() {
        return this.$read('function price1CumulativeLast() returns uint256');
    }
    async skim(eoa, to) {
        return this.$write('function skim(address)', eoa, to);
    }
    async swap(eoa, amount0Out, amount1Out, to, data) {
        return this.$write('function swap(uint256, uint256, address, bytes)', eoa, amount0Out, amount1Out, to, data);
    }
    async symbol() {
        return this.$read('function symbol() returns string');
    }
    async sync(eoa) {
        return this.$write('function sync()', eoa);
    }
    async token0() {
        return this.$read('function token0() returns address');
    }
    async token1() {
        return this.$read('function token1() returns address');
    }
    async totalSupply() {
        return this.$read('function totalSupply() returns uint256');
    }
    async transfer(eoa, to, value) {
        return this.$write('function transfer(address, uint256) returns bool', eoa, to, value);
    }
    async transferFrom(eoa, from, to, value) {
        return this.$write('function transferFrom(address, address, uint256) returns bool', eoa, from, to, value);
    }
    onApproval(fn) {
        return this.$on('Approval', fn);
    }
    onBurn(fn) {
        return this.$on('Burn', fn);
    }
    onMint(fn) {
        return this.$on('Mint', fn);
    }
    onSwap(fn) {
        return this.$on('Swap', fn);
    }
    onSync(fn) {
        return this.$on('Sync', fn);
    }
    onTransfer(fn) {
        return this.$on('Transfer', fn);
    }
}
exports.AmmPairContractV2Base = AmmPairContractV2Base;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_amm_AmmPairContractV2Base === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_amm_AmmPairContractV2Base) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_amm_AmmPairContractV2Base, module.exports);
    } else {
        _dequanto_contracts_gen_amm_AmmPairContractV2Base = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract != null ? _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract : {};
    var module = { exports: exports };

    "use strict";
/**
* dequanto
* name: AmmPairContractV2Base
* platform: bsc
* source.abi: 0x7752e1fa9f3a2e860856458517008558deb989e3
* output: ./contracts/gen/amm/
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmPairV2Contract = void 0;
const AmmPairContractV2Base_1 = _dequanto_contracts_gen_amm_AmmPairContractV2Base;
/* https://pancakeswap.info/token/0x8f0528ce5ef7b51152a59745befdd91d97091d2f */
/* https://pancakeswap.info/pool/0x7752e1fa9f3a2e860856458517008558deb989e3 */
class AmmPairV2Contract extends AmmPairContractV2Base_1.AmmPairContractV2Base {
}
exports.AmmPairV2Contract = AmmPairV2Contract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_gen_amm_AmmVaultV2ContractBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_gen_amm_AmmVaultV2ContractBase != null ? _dequanto_contracts_gen_amm_AmmVaultV2ContractBase : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmVaultV2ContractBase = void 0;
/**
 *  AUTO-Generated Class: 2021-11-09 14:26
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
class AmmVaultV2ContractBase extends ContractBase_1.ContractBase {
    constructor(address = '0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC', client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "contract IERC20", "name": "_receiptToken", "type": "address" }, { "internalType": "contract IMasterChef", "name": "_masterchef", "type": "address" }, { "internalType": "address", "name": "_admin", "type": "address" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lastDepositedTime", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "performanceFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "callFee", "type": "uint256" }], "name": "Harvest", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "MAX_CALL_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PERFORMANCE_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_WITHDRAW_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_WITHDRAW_FEE_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "available", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "calculateHarvestCakeRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "calculateTotalPendingCakeRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "callFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getPricePerFullShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "harvest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "inCaseTokensGetStuck", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastHarvestedTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "masterchef", "outputs": [{ "internalType": "contract IMasterChef", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "performanceFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "receiptToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "name": "setAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_callFee", "type": "uint256" }], "name": "setCallFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_performanceFee", "type": "uint256" }], "name": "setPerformanceFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_treasury", "type": "address" }], "name": "setTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_withdrawFee", "type": "uint256" }], "name": "setWithdrawFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_withdrawFeePeriod", "type": "uint256" }], "name": "setWithdrawFeePeriod", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalShares", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }, { "internalType": "uint256", "name": "lastDepositedTime", "type": "uint256" }, { "internalType": "uint256", "name": "cakeAtLastUserAction", "type": "uint256" }, { "internalType": "uint256", "name": "lastUserActionTime", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_shares", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdrawFeePeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
    }
    async MAX_CALL_FEE() {
        return this.$read('function MAX_CALL_FEE() returns uint256');
    }
    async MAX_PERFORMANCE_FEE() {
        return this.$read('function MAX_PERFORMANCE_FEE() returns uint256');
    }
    async MAX_WITHDRAW_FEE() {
        return this.$read('function MAX_WITHDRAW_FEE() returns uint256');
    }
    async MAX_WITHDRAW_FEE_PERIOD() {
        return this.$read('function MAX_WITHDRAW_FEE_PERIOD() returns uint256');
    }
    async admin() {
        return this.$read('function admin() returns address');
    }
    async available() {
        return this.$read('function available() returns uint256');
    }
    async balanceOf() {
        return this.$read('function balanceOf() returns uint256');
    }
    async calculateHarvestCakeRewards() {
        return this.$read('function calculateHarvestCakeRewards() returns uint256');
    }
    async calculateTotalPendingCakeRewards() {
        return this.$read('function calculateTotalPendingCakeRewards() returns uint256');
    }
    async callFee() {
        return this.$read('function callFee() returns uint256');
    }
    async deposit(eoa, _amount) {
        return this.$write('function deposit(uint256)', eoa, _amount);
    }
    async emergencyWithdraw(eoa) {
        return this.$write('function emergencyWithdraw()', eoa);
    }
    async getPricePerFullShare() {
        return this.$read('function getPricePerFullShare() returns uint256');
    }
    async harvest(eoa) {
        return this.$write('function harvest()', eoa);
    }
    async inCaseTokensGetStuck(eoa, _token) {
        return this.$write('function inCaseTokensGetStuck(address)', eoa, _token);
    }
    async lastHarvestedTime() {
        return this.$read('function lastHarvestedTime() returns uint256');
    }
    async masterchef() {
        return this.$read('function masterchef() returns address');
    }
    async owner() {
        return this.$read('function owner() returns address');
    }
    async pause(eoa) {
        return this.$write('function pause()', eoa);
    }
    async paused() {
        return this.$read('function paused() returns bool');
    }
    async performanceFee() {
        return this.$read('function performanceFee() returns uint256');
    }
    async receiptToken() {
        return this.$read('function receiptToken() returns address');
    }
    async renounceOwnership(eoa) {
        return this.$write('function renounceOwnership()', eoa);
    }
    async setAdmin(eoa, _admin) {
        return this.$write('function setAdmin(address)', eoa, _admin);
    }
    async setCallFee(eoa, _callFee) {
        return this.$write('function setCallFee(uint256)', eoa, _callFee);
    }
    async setPerformanceFee(eoa, _performanceFee) {
        return this.$write('function setPerformanceFee(uint256)', eoa, _performanceFee);
    }
    async setTreasury(eoa, _treasury) {
        return this.$write('function setTreasury(address)', eoa, _treasury);
    }
    async setWithdrawFee(eoa, _withdrawFee) {
        return this.$write('function setWithdrawFee(uint256)', eoa, _withdrawFee);
    }
    async setWithdrawFeePeriod(eoa, _withdrawFeePeriod) {
        return this.$write('function setWithdrawFeePeriod(uint256)', eoa, _withdrawFeePeriod);
    }
    async token() {
        return this.$read('function token() returns address');
    }
    async totalShares() {
        return this.$read('function totalShares() returns uint256');
    }
    async transferOwnership(eoa, newOwner) {
        return this.$write('function transferOwnership(address)', eoa, newOwner);
    }
    async treasury() {
        return this.$read('function treasury() returns address');
    }
    async unpause(eoa) {
        return this.$write('function unpause()', eoa);
    }
    async userInfo(input0) {
        return this.$read('function userInfo(address) returns (uint256 shares,uint256 lastDepositedTime,uint256 cakeAtLastUserAction,uint256 lastUserActionTime)', input0);
    }
    async withdraw(eoa, _shares) {
        return this.$write('function withdraw(uint256)', eoa, _shares);
    }
    async withdrawAll(eoa) {
        return this.$write('function withdrawAll()', eoa);
    }
    async withdrawFee() {
        return this.$read('function withdrawFee() returns uint256');
    }
    async withdrawFeePeriod() {
        return this.$read('function withdrawFeePeriod() returns uint256');
    }
    onDeposit(fn) {
        return this.$on('Deposit', fn);
    }
    onHarvest(fn) {
        return this.$on('Harvest', fn);
    }
    onOwnershipTransferred(fn) {
        return this.$on('OwnershipTransferred', fn);
    }
    onPause(fn) {
        return this.$on('Pause', fn);
    }
    onPaused(fn) {
        return this.$on('Paused', fn);
    }
    onUnpause(fn) {
        return this.$on('Unpause', fn);
    }
    onUnpaused(fn) {
        return this.$on('Unpaused', fn);
    }
    onWithdraw(fn) {
        return this.$on('Withdraw', fn);
    }
}
exports.AmmVaultV2ContractBase = AmmVaultV2ContractBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_gen_amm_AmmVaultV2ContractBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_gen_amm_AmmVaultV2ContractBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_gen_amm_AmmVaultV2ContractBase, module.exports);
    } else {
        _dequanto_contracts_gen_amm_AmmVaultV2ContractBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract != null ? _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract : {};
    var module = { exports: exports };

    "use strict";
/**
* dequanto
* name: AmmVaultV2ContractBase
* platform: bsc
* source.abi: 0xa80240Eb5d7E05d3F250cF000eEc0891d00b51CC
* output: ./contracts/gen/amm/
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmVaultV2Contract = void 0;
const AmmVaultV2ContractBase_1 = _dequanto_contracts_gen_amm_AmmVaultV2ContractBase;
/* https://docs.pancakeswap.finance/code/smart-contracts/cakevault */
class AmmVaultV2Contract extends AmmVaultV2ContractBase_1.AmmVaultV2ContractBase {
}
exports.AmmVaultV2Contract = AmmVaultV2Contract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase != null ? _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmV2ExchangeBase = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const memd_1 = __importDefault(require("memd"));
const alot_1 = __importDefault(require("alot"));
const ContractReader_1 = _dequanto_src_contracts_ContractReader;
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const _bigint_1 = _dequanto_src_utils__bigint;
const AmmFactoryV2Contract_1 = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmFactoryV2Contract;
const AmmMasterChefV2Contract_1 = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmMasterChefV2Contract;
const AmmPairV2Contract_1 = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Contract;
const AmmVaultV2Contract_1 = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmVaultV2Contract;
const TokensServiceBsc_1 = _dequanto_src_tokens_TokensServiceBsc;
const _is_1 = _dequanto_src_utils__is;
const _address_1 = _dequanto_src_utils__address;
class AmmV2ExchangeBase {
    constructor(client, explorer) {
        this.client = client;
        this.explorer = explorer;
    }
    get pairsStore() {
        return new JsonArrayStore_1.JsonArrayStore({
            path: `/cache/dequanto/${this.client.platform}/amm/${this.name}/pairs.json`,
            key: x => x.address
        });
    }
    get factoryContract() {
        return a_di_1.default.resolve(AmmFactoryV2Contract_1.AmmFactoryV2Contract, this.factoryAddress, this.client, this.explorer);
    }
    get masterChefContract() {
        return a_di_1.default.resolve(AmmMasterChefV2Contract_1.AmmMasterChefV2Contract, this.masterChefAddress, this.client, this.explorer);
    }
    get vaultContract() {
        return a_di_1.default.resolve(AmmVaultV2Contract_1.AmmVaultV2Contract, this.vaultAddress, this.client, this.explorer);
    }
    pairContract(pair) {
        return a_di_1.default.resolve(AmmPairV2Contract_1.AmmPairV2Contract, pair, this.client, this.explorer);
    }
    async calcSwap(from, to, fromAmount) {
        _is_1.$is.BigInt(fromAmount);
        if (fromAmount === 0n) {
            return {
                amount: 0n,
                priceImpact: 0
            };
        }
        let lpAddress = await this.factoryContract.getPair(from.address, to.address);
        if (_address_1.$address.isEmpty(lpAddress)) {
            return null;
        }
        let poolPair = this.pairContract(lpAddress);
        let lpReserves = await poolPair.getReserves();
        if (lpReserves == null || lpReserves._reserve0 < 1000n) {
            return null;
        }
        _is_1.$is.BigInt(lpReserves?._reserve0, `Reserve 0 not valid for LPAddress ${lpAddress}`);
        _is_1.$is.BigInt(lpReserves?._reserve1, `Reserve 1 not valid for LPAddress ${lpAddress}`);
        let [fromI, toI] = BigInt(from.address) < BigInt(to.address) ? [0, 1] : [1, 0];
        let reserveFrom = lpReserves[`_reserve${fromI}`];
        let reserveTo = lpReserves[`_reserve${toI}`];
        let amountIdeal = fromAmount * reserveTo / reserveFrom;
        let k = reserveFrom * reserveTo;
        let reserveFromAfter = reserveFrom + fromAmount;
        let reserveToAfter = k / reserveFromAfter;
        let amountActual = reserveTo - reserveToAfter;
        let priceImpactPercents = (1 - _bigint_1.$bigint.divToFloat(amountActual, amountIdeal)) * 100;
        return {
            amount: amountActual,
            priceImpact: priceImpactPercents,
        };
    }
    async getPairs() {
        let reader = new ContractReader_1.ContractReader(this.client);
        let addresses = await reader.readAsync(this.factoryAddress, 'allPairs() returns (address[])');
        return addresses;
    }
    async redownloadPairs() {
        let pairsCached = await this.readPairs();
        let max = (0, alot_1.default)(pairsCached).max(x => x.i);
        let i = Math.max(max - 4, 0);
        let length = await this.factoryContract.allPairsLength();
        let all = [...pairsCached];
        let pairs = await alot_1.default
            .fromRange(i, Number(length))
            .mapAsync(async (i) => {
            console.log(`Loading ${i}/${length}`);
            let pair = await this.getPairInfoAtIndex(i);
            all.push(pair);
            if (i % 100 === 0) {
                await this.savePairs(all);
            }
            return pair;
        })
            .toArrayAsync();
        await this.pairsStore.saveAll(pairs);
        return pairs;
    }
    async getPairInfoAtIndex(i) {
        let factory = this.factoryContract;
        let pairAddress = await factory.allPairs(BigInt(i));
        let pairContract = this.pairContract(pairAddress);
        let [symbol, token0Addr, token1Addr,] = await Promise.all([
            pairContract.symbol(),
            pairContract.token0(),
            pairContract.token1(),
        ]);
        let tokensService = a_di_1.default.resolve(TokensServiceBsc_1.TokensServiceBsc);
        let [token0, token1] = await Promise.all([
            tokensService.getTokenOrDefault(token0Addr),
            tokensService.getTokenOrDefault(token1Addr),
        ]);
        return {
            name: symbol,
            symbol: symbol,
            platform: 'bsc',
            address: pairAddress,
            i: Number(i),
            token0: token0,
            token1: token1,
        };
    }
    async savePairs(pairs) {
        let jsons = pairs.map(pair => ({
            address: pair.address,
            i: pair.i,
            token0: {
                "symbol": pair.token0.symbol,
                "address": pair.token0.address,
                "decimals": (pair.token0.decimals == null || pair.token0.decimals === 18)
                    ? void 0
                    : pair.token0.decimals,
            },
            token1: {
                "symbol": pair.token1.symbol,
                "address": pair.token1.address,
                "decimals": (pair.token1.decimals == null || pair.token1.decimals === 18)
                    ? void 0
                    : pair.token1.decimals,
            },
        }));
        await this.pairsStore.saveAll(jsons);
    }
    async readPairs() {
        let jsons = await this.pairsStore.getAll();
        let pairs = jsons.map(pair => ({
            "name": "LP",
            "symbol": "LP",
            "platform": this.client.platform,
            address: pair.address,
            i: pair.i,
            token0: {
                "platform": this.client.platform,
                "symbol": pair.token0.symbol,
                "name": pair.token0.symbol,
                "address": pair.token0.address,
                "decimals": pair.token0.decimals ?? 18,
            },
            token1: {
                "platform": this.client.platform,
                "symbol": pair.token1.symbol,
                "name": pair.token1.symbol,
                "address": pair.token1.address,
                "decimals": pair.token1.decimals ?? 18,
            },
        }));
        return pairs;
    }
}
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], AmmV2ExchangeBase.prototype, "pairsStore", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], AmmV2ExchangeBase.prototype, "factoryContract", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], AmmV2ExchangeBase.prototype, "masterChefContract", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], AmmV2ExchangeBase.prototype, "vaultContract", null);
__decorate([
    memd_1.default.deco.memoize({ perInstance: true })
], AmmV2ExchangeBase.prototype, "pairContract", null);
exports.AmmV2ExchangeBase = AmmV2ExchangeBase;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_PancakeswapExchange;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_PancakeswapExchange != null ? _dequanto_src_tokens_TokenExchanges_PancakeswapExchange : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeswapExchange = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const _config_1 = _dequanto_src_utils__config;
const AmmV2ExchangeBase_1 = _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase;
const _require_1 = _dequanto_src_utils__require;
class PancakeswapExchange extends AmmV2ExchangeBase_1.AmmV2ExchangeBase {
    constructor(client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(client, explorer);
        this.client = client;
        this.explorer = explorer;
        this.name = 'pancake';
        this.config = _config_1.$config.get('pancackeswap');
        this.factoryAddress = _require_1.$require.Address(this.config.factory, 'Factory Address');
        this.masterChefAddress = _require_1.$require.Address(this.config.masterChef, 'MasterChef Address');
        this.vaultAddress = _require_1.$require.Address(this.config.vault, 'Vault Address');
    }
}
exports.PancakeswapExchange = PancakeswapExchange;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_PancakeswapExchange === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_PancakeswapExchange) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_PancakeswapExchange, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_PancakeswapExchange = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_UniswapExchange;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_UniswapExchange != null ? _dequanto_src_tokens_TokenExchanges_UniswapExchange : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapExchange = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _config_1 = _dequanto_src_utils__config;
const AmmV2ExchangeBase_1 = _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
const _require_1 = _dequanto_src_utils__require;
class UniswapExchange extends AmmV2ExchangeBase_1.AmmV2ExchangeBase {
    constructor(client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client), explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        super(client, explorer);
        this.client = client;
        this.explorer = explorer;
        this.name = 'uniswap';
        this.config = _config_1.$config.get('uniswapV2');
        this.factoryAddress = _require_1.$require.Address(this.config.factory, 'Factory Address');
        this.masterChefAddress = _require_1.$require.Address(this.config.vault, 'Vault Address');
        this.vaultAddress = this.config.masterChef;
    }
}
exports.UniswapExchange = UniswapExchange;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_UniswapExchange === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_UniswapExchange) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_UniswapExchange, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_UniswapExchange = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenOracles_TokenPriceStore;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenOracles_TokenPriceStore != null ? _dequanto_src_tokens_TokenOracles_TokenPriceStore : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPriceStore = void 0;
const JsonArrayStore_1 = _dequanto_src_json_JsonArrayStore;
const memd_1 = __importDefault(require("memd"));
class TokenPriceStore {
    constructor(token) {
        this.token = token;
        this.prices = [];
        this.pricesIdx = {};
        this.store = new JsonArrayStore_1.JsonArrayStore({
            path: `./db/tokens/${this.token}.json`,
            key: x => String(x[0])
        });
    }
    static forToken(token) {
        return stores[token] ?? (stores[token] = new TokenPriceStore(token));
    }
    async getPrice(date = Date.now()) {
        if (this.prices == null) {
            await this.restore();
        }
        let [timestamp, price] = this.get(date) ?? EMPTY;
        return price;
    }
    async setPrice(price, date = Date.now()) {
        if (this.prices == null) {
            await this.restore();
        }
        this.add(date, price);
    }
    async restore() {
        let prices = await this.store.getAll() ?? [];
        prices.forEach(([timestamp, price]) => {
            this.add(timestamp, price);
        });
    }
    async save() {
        await this.store.saveAll(this.prices);
    }
    add(timestamp, price) {
        let idx = this.pricesIdx;
        let $minute = pickMinuteArr(idx, timestamp);
        let tuple = [timestamp, price];
        $minute.push(tuple);
        this.prices.push(tuple);
        this.save();
    }
    get(timestamp, tolerance = 1) {
        let idx = this.pricesIdx;
        let ms = timestamp;
        for (let i = 0; i < tolerance + 1; i++) {
            let $minute = pickMinuteArr(idx, ms - i * MINUTE);
            if ($minute.length !== 0) {
                return $minute[0];
            }
            if (i === 0) {
                continue;
            }
            let $minuteAfter = pickMinuteArr(idx, ms + i * MINUTE);
            if ($minuteAfter.length !== 0) {
                return $minuteAfter[0];
            }
        }
        return null;
    }
}
__decorate([
    memd_1.default.deco.memoize()
], TokenPriceStore.prototype, "restore", null);
__decorate([
    memd_1.default.deco.throttle(4 * 1000)
], TokenPriceStore.prototype, "save", null);
exports.TokenPriceStore = TokenPriceStore;
const stores = Object.create(null);
const EMPTY = [null, null];
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const keys = ['', '', ''];
function split(timestamp) {
    let day = timestamp / DAY | 0;
    let hour = timestamp % DAY / HOUR | 0;
    let minute = timestamp % DAY % HOUR / MINUTE | 0;
    keys[0] = `_${day}`;
    keys[1] = `_${hour}`;
    keys[2] = `_${minute}`;
    return keys;
}
function pickMinuteArr(idx, timestamp) {
    let [day, hour, min] = split(timestamp);
    let _day = `_${day}`;
    let _hour = `_${hour}`;
    let _min = `_${min}`;
    let $day = idx[_day] ?? (idx[_day] = Object.create(null));
    let $hour = $day[_hour] ?? ($day[_hour] = Object.create(null));
    let $minute = $hour[_min] ?? ($hour[_min] = []);
    return $minute;
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenOracles_TokenPriceStore === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenOracles_TokenPriceStore) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenOracles_TokenPriceStore, module.exports);
    } else {
        _dequanto_src_tokens_TokenOracles_TokenPriceStore = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange != null ? _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPolygonExchange = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Bscscan_1 = _dequanto_src_BlockchainExplorer_Bscscan;
const BscWeb3Client_1 = _dequanto_src_clients_BscWeb3Client;
const _config_1 = _dequanto_src_utils__config;
const AmmV2ExchangeBase_1 = _dequanto_src_tokens_TokenExchanges_AmmV2ExchangeBase;
const _require_1 = _dequanto_src_utils__require;
class SushiswapPolygonExchange extends AmmV2ExchangeBase_1.AmmV2ExchangeBase {
    // private factory = $require.Address(this.config.factory, 'Factory Address');
    // private vault = $require.Address(this.config.vault, 'Vault Address');
    constructor(client = a_di_1.default.resolve(BscWeb3Client_1.BscWeb3Client), explorer = a_di_1.default.resolve(Bscscan_1.Bscscan)) {
        super(client, explorer);
        this.client = client;
        this.explorer = explorer;
        this.name = 'sushiswap';
        this.config = _config_1.$config.get('sushiswap');
        this.factoryAddress = '0xc35dadb65012ec5796536bd9864ed8773abc74c4';
        this.masterChefAddress = _require_1.$require.Address(this.config?.masterChef ?? '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F', 'MasterChef Address');
        this.vaultAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506';
    }
}
exports.SushiswapPolygonExchange = SushiswapPolygonExchange;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service != null ? _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmPairV2Service = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const memd_1 = __importDefault(require("memd"));
const _address_1 = _dequanto_src_utils__address;
const PancakeswapExchange_1 = _dequanto_src_tokens_TokenExchanges_PancakeswapExchange;
const UniswapExchange_1 = _dequanto_src_tokens_TokenExchanges_UniswapExchange;
const TokensService_1 = _dequanto_src_tokens_TokensService;
const SushiswapPolygonExchange_1 = _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange;
const _require_1 = _dequanto_src_utils__require;
;
class AmmPairV2Service {
    constructor(client, explorer) {
        this.client = client;
        this.explorer = explorer;
        this.tokensService = a_di_1.default.resolve(TokensService_1.TokensService, this.client.platform, this.explorer);
        switch (client.platform) {
            case 'bsc':
                this.exchange = a_di_1.default.resolve(PancakeswapExchange_1.PancakeswapExchange, this.client, this.explorer);
                this.targetCoins = ['BUSD', 'USDT'];
                break;
            case 'eth':
                this.exchange = a_di_1.default.resolve(UniswapExchange_1.UniswapExchange, this.client, this.explorer);
                this.targetCoins = ['USDC', 'USDT', 'DAI'];
                break;
            case 'polygon':
                this.exchange = a_di_1.default.resolve(SushiswapPolygonExchange_1.SushiswapPolygonExchange, this.client, this.explorer);
                this.targetCoins = ['USDC', 'USDT', 'DAI'];
                break;
            default:
                throw new Error(`Unsupported Platform for exchange yet: ${client.platform}`);
        }
    }
    async resolveBestStableRoute(platform, address) {
        let pool = await (0, alot_1.default)(this.targetCoins)
            .mapAsync(async (symbol) => {
            return this.getPoolInfo(address, symbol);
        })
            .filterAsync(x => x != null)
            .sortByAsync(({ reserveTo }) => reserveTo, 'desc')
            .firstAsync();
        if (pool == null || pool.reserveTo < (50000n * BigInt(pool.pair.to.decimals))) {
            const SYMBOL = { eth: 'WETH', bsc: 'WBNB', polygon: 'MATIC' }[platform];
            _require_1.$require.notNull(SYMBOL, `Native symbol for platform ${platform} not FOUND`);
            const nativeTokenPool = await this.getPoolInfo(address, SYMBOL);
            if (nativeTokenPool == null || nativeTokenPool.reserveTo < 10) {
                return null;
            }
            let nativeRoute = await this.resolveBestStableRoute(platform, nativeTokenPool.pair.to.address);
            if (nativeRoute == null) {
                return null;
            }
            return [
                nativeTokenPool.pair,
                ...nativeRoute
            ];
        }
        return [pool.pair];
    }
    async resolveRoute(address, symbols) {
        let tokens = await (0, alot_1.default)(symbols)
            .mapAsync(x => this.tokensService.getTokenOrDefault(x))
            .toArrayAsync();
        let prev = address;
        let out = [];
        for (let token of tokens) {
            let poolInfo = await this.getPoolInfo(prev, token.address);
            out.push(poolInfo.pair);
            prev = token.address;
        }
        return out;
    }
    async getPoolInfo(fromAddress, symbol) {
        let toToken = await this.tokensService.getTokenOrDefault(symbol);
        if (toToken == null) {
            return null;
        }
        let lpAddress = await this.getPair(fromAddress, toToken.address);
        if (_address_1.$address.isEmpty(lpAddress)) {
            return null;
        }
        let poolPair = this.exchange.pairContract(lpAddress);
        let lpReserves = await poolPair.getReserves();
        if (lpReserves == null || lpReserves._reserve0 < 1000n) {
            return null;
        }
        let [fromI, toI] = BigInt(fromAddress) < BigInt(toToken.address) ? [0, 1] : [1, 0];
        let reserveFrom = lpReserves[`_reserve${fromI}`];
        let reserveTo = lpReserves[`_reserve${toI}`];
        if (toToken.decimals == null) {
            toToken.decimals = 18;
        }
        if (reserveTo < 10n ** BigInt(toToken.decimals ?? 18)) {
            return null;
        }
        let fromToken = await this.tokensService.getTokenOrDefault(fromAddress);
        return {
            pair: PairUtil.createPairInfo(fromToken, toToken, lpAddress),
            reserveTo: Number(reserveTo / 10n ** BigInt(toToken.decimals ?? 18)),
        };
    }
    async getPair(from, to) {
        return await this.exchange.factoryContract.getPair(from, to);
    }
}
__decorate([
    memd_1.default.deco.memoize({
        perInstance: true,
        trackRef: true,
        persistance: new memd_1.default.FsTransport({ path: `./cache/pools.json` })
    })
], AmmPairV2Service.prototype, "resolveBestStableRoute", null);
__decorate([
    memd_1.default.deco.memoize()
], AmmPairV2Service.prototype, "getPair", null);
exports.AmmPairV2Service = AmmPairV2Service;
var PairUtil;
(function (PairUtil) {
    function createPairInfo(fromToken, toToken, lpAddress) {
        let token0 = fromToken.address;
        let token1 = toToken.address;
        if (BigInt(token1) < BigInt(token0)) {
            token0 = toToken.address;
            token1 = fromToken.address;
        }
        return {
            address: lpAddress,
            token0,
            token1,
            from: fromToken,
            to: toToken,
        };
    }
    PairUtil.createPairInfo = createPairInfo;
})(PairUtil || (PairUtil = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service, module.exports);
    } else {
        _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle != null ? _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRangePriceService = exports.AmmPriceV2Oracle = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const PancakeswapExchange_1 = _dequanto_src_tokens_TokenExchanges_PancakeswapExchange;
const UniswapExchange_1 = _dequanto_src_tokens_TokenExchanges_UniswapExchange;
const TokenUtils_1 = _dequanto_src_tokens_utils_TokenUtils;
const TokensService_1 = _dequanto_src_tokens_TokensService;
const _address_1 = _dequanto_src_utils__address;
const LoggerService_1 = _dequanto_src_loggers_LoggerService;
const TokenPriceStore_1 = _dequanto_src_tokens_TokenOracles_TokenPriceStore;
const _bigint_1 = _dequanto_src_utils__bigint;
const AmmPairV2Service_1 = _dequanto_src_tokens_TokenExchanges_AmmBase_V2_AmmPairV2Service;
const SushiswapPolygonExchange_1 = _dequanto_src_tokens_TokenExchanges_SushiswapPolygonExchange;
class AmmPriceV2Oracle {
    constructor(client, explorer) {
        this.client = client;
        this.explorer = explorer;
        this.tokensService = a_di_1.default.resolve(TokensService_1.TokensService, this.client.platform, this.explorer);
        this.pairService = a_di_1.default.resolve(AmmPairV2Service_1.AmmPairV2Service, this.client, this.explorer);
        this.logger = a_di_1.default.resolve(LoggerService_1.LoggerService, 'AmmPriceV2Oracle');
        switch (client.platform) {
            case 'bsc':
                this.exchange = a_di_1.default.resolve(PancakeswapExchange_1.PancakeswapExchange, this.client, this.explorer);
                break;
            case 'eth':
                this.exchange = a_di_1.default.resolve(UniswapExchange_1.UniswapExchange, this.client, this.explorer);
                break;
            case 'polygon':
                this.exchange = a_di_1.default.resolve(SushiswapPolygonExchange_1.SushiswapPolygonExchange, this.client, this.explorer);
                break;
            default:
                throw new Error(`Unsupported Platform for exchange yet: ${client.platform}`);
        }
    }
    async getPrice(token, opts) {
        let amount = opts?.amountWei ?? (BigInt(opts?.amount ?? 1) * 10n ** BigInt(token.decimals));
        if (TokenUtils_1.TokenUtils.isStable(token.symbol)) {
            // Assume swap 1:1
            let usd = _bigint_1.$bigint.divToFloat(amount, 10n ** BigInt(token.decimals));
            return {
                result: {
                    outToken: token,
                    outAmount: amount,
                    outUsd: usd,
                    outUsdPrice: 1,
                    inToken: token,
                    inAmount: amount,
                    inUsd: usd,
                    inUsdPrice: 1,
                    route: [],
                }
            };
        }
        let cacheableDate = opts?.date ?? (opts?.block == null && new Date() || null);
        if (cacheableDate != null) {
            let swap = await this.getSwapFromCache(token, amount, cacheableDate);
            if (swap != null) {
                return swap;
            }
        }
        let pairs;
        if (opts?.pairs) {
            pairs = opts.pairs.map(pair => {
                let tokens = [pair.from.address, pair.to.address];
                let sorted = BigInt(tokens[0]) < BigInt(tokens[1]);
                return {
                    address: pair.address,
                    token0: sorted ? tokens[0] : tokens[1],
                    token1: sorted ? tokens[1] : tokens[0],
                    from: pair.from,
                    to: pair.to
                };
            });
        }
        let route = pairs ?? (opts?.route != null
            ? await this.pairService.resolveRoute(token.address, opts.route)
            : await this.pairService.resolveBestStableRoute(this.client.platform, token.address));
        if (route == null || route.length === 0) {
            let error = new Error(`Route not found for Token ${token.address}`);
            //this.logger.write(error.message);
            return { error };
        }
        let pools = await (0, alot_1.default)(route).mapAsync(async (lp) => {
            if (cacheableDate != null) {
                let price = await this.getPriceInUsdFromCache(lp.from.address, cacheableDate);
                if (price != null) {
                    return {
                        result: {
                            ...lp,
                            date: cacheableDate,
                            priceFrom: price
                        }
                    };
                }
            }
            let poolPair = this.exchange.pairContract(lp.address);
            let lpReserves = await poolPair
                .forBlock(opts?.block ?? opts?.date)
                .getReserves();
            if (lpReserves == null || lpReserves._reserve0 < 1000n) {
                let error = new Error(`Small reserve in the routed pool ${lp.address}: ${lpReserves._reserve1} - ${lpReserves._reserve0}`);
                this.logger.write(error.message);
                return { error };
            }
            return {
                result: {
                    ...lp,
                    date: cacheableDate,
                    reserves: lpReserves
                }
            };
        }).toArrayAsync({ errors: 'reject' });
        let error = (0, alot_1.default)(pools).first(x => x.error != null)?.error;
        if (error != null) {
            return { error };
        }
        let swapped = await TokenPrice.swapRouted(token, amount, pools.map(x => x.result), this.tokensService);
        return { result: swapped };
    }
    async getSwapFromCache(token, inAmount, date) {
        if (date == null) {
            return null;
        }
        let inPrice = await this.getPriceInUsdFromCache(token.address, date);
        if (inPrice == null) {
            return null;
        }
        let usdcToken = await this.tokensService.getToken('USDC');
        let outAmount = inAmount
            * (_bigint_1.$bigint.toBigInt(inPrice * 10 ** 6) * _bigint_1.$bigint.pow(10, usdcToken.decimals - 6))
            / (_bigint_1.$bigint.pow(10, token.decimals));
        let outUsd = _bigint_1.$bigint.divToFloat(outAmount, 10n ** BigInt(token.decimals));
        return {
            result: {
                outToken: usdcToken,
                outAmount: outAmount,
                outUsd: outUsd,
                outUsdPrice: 1,
                inToken: token,
                inAmount: inAmount,
                inUsd: outUsd,
                inUsdPrice: inPrice,
                route: [],
            }
        };
    }
    async getPriceInUsdFromCache(token, date) {
        if (date == null) {
            return null;
        }
        return TokenPriceStore_1.TokenPriceStore.forToken(token).getPrice(date.getTime());
    }
    async setPriceInUsdToCache(token, date, price) {
        if (date == null) {
            return null;
        }
        return TokenPriceStore_1.TokenPriceStore.forToken(token).setPrice(price, date.getTime());
    }
}
exports.AmmPriceV2Oracle = AmmPriceV2Oracle;
class TokenRangePriceService {
    constructor(service) {
        this.service = service;
        this.cache = new Map();
        this.INTERVAL = 5 * 60 * 1000;
    }
    async getPrice(mix, opts) {
        let key = typeof mix === 'string'
            ? mix
            : mix.address;
        let byBlock = null;
        let byDate = null;
        if (opts?.block != null) {
            byBlock = opts.block;
            key += '_' + (byBlock - byBlock % 20) + '';
        }
        else {
            let d = opts.date ?? new Date;
            byDate = new Date(d);
            byDate.setMilliseconds(0);
            byDate.setSeconds(0);
            let minutes = byDate.getMinutes();
            minutes -= minutes % 5;
            byDate.setMinutes(minutes);
            key += '_' + byDate.toISOString();
        }
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        let promise = this.service.getPrice(mix, {
            ...(opts ?? {}),
            date: byDate,
            block: byBlock
        });
        this.cache.set(key, promise);
        return promise;
    }
}
exports.TokenRangePriceService = TokenRangePriceService;
var TokenPrice;
(function (TokenPrice) {
    async function swapRouted(fromToken, fromAmount, route, tokenService) {
        let $step;
        let $fromToken = fromToken;
        let $fromAmount = fromAmount;
        let $route = [];
        for (let i = 0; i < route.length; i++) {
            $step = await calcSwap($fromToken, $fromAmount, route[i], tokenService);
            $fromAmount = $step.toAmount;
            $fromToken = $step.to;
            $route.push($step);
        }
        calcUsdFromRoute($route);
        let $stepFirst = $route[0];
        //console.log('LAST STEP for ', fromToken.symbol, $step);
        return {
            outToken: $step.to,
            outAmount: $step.toAmount,
            outUsd: $step.toUsd,
            outUsdPrice: $step.toPrice,
            inToken: $stepFirst.from,
            inAmount: $stepFirst.fromAmount,
            inUsd: $stepFirst.fromUsd,
            inUsdPrice: $stepFirst.fromPrice,
            route: $route,
        };
    }
    TokenPrice.swapRouted = swapRouted;
    function calcUsdFromRoute(route) {
        let knownUsd = route.find(x => x.fromUsd != null || x.toUsd != null);
        if (knownUsd == null) {
            return;
        }
        let knownUsdI = route.indexOf(knownUsd);
        for (let i = knownUsdI - 1; i > -1; i--) {
            let knownPrice = route[i + 1];
            let prev = route[i];
            prev.toUsd = knownPrice.fromUsd;
            prev.toPrice = TokenUtils_1.TokenUtils.calcPrice(prev.toAmount, prev.to, prev.toUsd);
            prev.fromUsd = prev.toUsd;
            prev.fromPrice = TokenUtils_1.TokenUtils.calcPrice(prev.fromAmount, prev.from, prev.fromUsd);
        }
        for (let i = knownUsdI + 1; i < route.length; i++) {
            let knownPrice = route[i - 1];
            let next = route[i];
            next.fromUsd = knownPrice.toUsd;
            next.fromPrice = TokenUtils_1.TokenUtils.calcPrice(next.fromAmount, next.from, next.fromUsd);
            next.toUsd = next.fromUsd;
            next.toPrice = TokenUtils_1.TokenUtils.calcPrice(next.toAmount, next.to, next.toUsd);
        }
    }
    async function calcPrices(swapped) {
    }
    TokenPrice.calcPrices = calcPrices;
    async function calcSwap(fromToken, fromAmount, lp, tokenService) {
        let fromTokenAddress = lp.from.address;
        let toTokenAddress = lp.to.address;
        if (_address_1.$address.eq(fromTokenAddress, fromToken.address) === false) {
            throw new Error(`Invalid from token addres ${fromTokenAddress} != ${fromToken.address}`);
        }
        let $fromPrice = lp.fromPrice;
        if ($fromPrice != null) {
            let $fromUsd = TokenUtils_1.TokenUtils.calcTotal(fromToken, fromAmount, $fromPrice);
            return {
                from: fromToken,
                fromAmount: fromAmount,
                fromUsd: $fromUsd,
                fromPrice: $fromPrice,
                // Optimistic assume same USD out.
                toUsd: $fromUsd
            };
        }
        let [fromI, toI] = BigInt(fromToken.address) < BigInt(toTokenAddress) ? [0, 1] : [1, 0];
        let toToken = lp.to;
        let reserveFrom = lp.reserves[`_reserve${fromI}`];
        let reserveTo = lp.reserves[`_reserve${toI}`];
        let k = reserveFrom * reserveTo;
        let reserveFromAfter = reserveFrom + fromAmount;
        let reserveToAfter = k / reserveFromAfter;
        let amountActual = reserveTo - reserveToAfter;
        let fromUsd = TokenUtils_1.TokenUtils.calcUsdIfStable(fromAmount, fromToken);
        let toUsd = TokenUtils_1.TokenUtils.calcUsdIfStable(amountActual, toToken);
        let fromPrice = TokenUtils_1.TokenUtils.calcPrice(fromAmount, fromToken, fromUsd ?? toUsd);
        let toPrice = TokenUtils_1.TokenUtils.calcPrice(amountActual, toToken, toUsd ?? fromUsd);
        //console.log('FromPice', fromPrice, fromAmount, fromToken, fromUsd, toUsd);
        //$logger.log(`Swap: ${fromToken.symbol}(${fromAmount})[${fromUsd}$] > ${toToken.symbol} (${amountActual})[${toUsd}$]; Price ${fromToken.symbol}: ${fromPrice}`);
        if (lp.date) {
            // Cache prices
            let fromStore = TokenPriceStore_1.TokenPriceStore.forToken(fromToken.address);
            fromStore.setPrice(fromPrice, lp.date.getTime());
            let toStore = TokenPriceStore_1.TokenPriceStore.forToken(toToken.address);
            toStore.setPrice(toPrice, lp.date.getTime());
        }
        return {
            from: lp.from,
            fromAmount: fromAmount,
            fromUsd: fromUsd ?? toUsd,
            fromPrice,
            to: lp.to,
            toAmount: amountActual,
            toUsd: toUsd ?? fromUsd,
            toPrice,
            usd: 0,
            date: new Date(Number(lp.reserves._blockTimestampLast * 1000)),
            pool: {
                address: lp.address,
                reserve0: lp.reserves._reserve0,
                reserve1: lp.reserves._reserve1,
            }
        };
    }
    TokenPrice.calcSwap = calcSwap;
})(TokenPrice || (TokenPrice = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle, module.exports);
    } else {
        _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_tokens_TokenPriceService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_tokens_TokenPriceService != null ? _dequanto_src_tokens_TokenPriceService : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPriceServiceCacheable = exports.TokenPriceService = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokenUtils_1 = _dequanto_src_tokens_utils_TokenUtils;
const TokensService_1 = _dequanto_src_tokens_TokensService;
const _address_1 = _dequanto_src_utils__address;
const AmmPriceV2Oracle_1 = _dequanto_src_tokens_TokenOracles_AmmPriceV2Oracle;
const _bigint_1 = _dequanto_src_utils__bigint;
const _logger_1 = _dequanto_src_utils__logger;
class TokenPriceService {
    constructor(client, explorer) {
        this.client = client;
        this.explorer = explorer;
        this.tokens = a_di_1.default.resolve(TokensService_1.TokensService, this.client.platform, this.explorer);
        this.oracle = a_di_1.default.resolve(AmmPriceV2Oracle_1.AmmPriceV2Oracle, this.client, this.explorer);
    }
    async getPrice(mix, opts) {
        let token;
        try {
            token = typeof mix === 'string'
                ? await this.tokens.getKnownToken(mix)
                : mix;
        }
        catch (error) { }
        if (token == null) {
            return { error: new Error(`Token ${mix} not found`) };
        }
        if (token.decimals == null) {
            return { error: new Error(`Token has no decimals ${token.symbol}`) };
        }
        let { error, result } = await this.oracle.getPrice(token, opts);
        if (error != null) {
            return { error };
        }
        return {
            price: result.outUsd,
            pools: result.route.map(route => {
                let sorted = BigInt(route.from.address) < BigInt(route.to.address);
                let t1 = {
                    price: sorted ? route.fromPrice : route.toPrice,
                    decimals: sorted ? route.from.decimals : route.to.decimals,
                    total: sorted ? route.pool.reserve0 : route.pool.reserve1,
                };
                let t2 = {
                    price: sorted ? route.toPrice : route.fromPrice,
                    decimals: sorted ? route.to.decimals : route.from.decimals,
                    total: sorted ? route.pool.reserve1 : route.pool.reserve0,
                };
                function getTotalToken(t) {
                    let amount = t.total / 10n ** BigInt(t.decimals);
                    return _bigint_1.$bigint.multWithFloat(amount, t.price);
                }
                return getTotalToken(t1) + getTotalToken(t2);
            })
        };
    }
}
exports.TokenPriceService = TokenPriceService;
class TokenPriceServiceCacheable {
    constructor(service) {
        this.service = service;
        this.cache = new Map();
        this.INTERVAL = 5 * 60 * 1000;
    }
    async getPrice(mix, opts) {
        let key = typeof mix === 'string'
            ? mix
            : mix.address;
        let byBlock = null;
        let byDate = null;
        if (opts?.block != null) {
            byBlock = opts.block;
            key += '_' + (byBlock - byBlock % 20) + '';
        }
        else {
            let d = opts.date ?? new Date;
            byDate = new Date(d);
            byDate.setMilliseconds(0);
            byDate.setSeconds(0);
            let minutes = byDate.getMinutes();
            minutes -= minutes % 5;
            byDate.setMinutes(minutes);
            key += '_' + byDate.toISOString();
        }
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        let promise = this.service.getPrice(mix, {
            ...(opts ?? {}),
            date: byDate,
            block: byBlock
        });
        this.cache.set(key, promise);
        return promise;
    }
}
exports.TokenPriceServiceCacheable = TokenPriceServiceCacheable;
var TokenPrice;
(function (TokenPrice) {
    async function swapRouted(fromToken, fromAmount, route, tokenService) {
        let $step;
        let $fromToken = fromToken;
        let $fromAmount = fromAmount;
        let $route = [];
        for (let i = 0; i < route.length; i++) {
            $step = await calcSwap($fromToken, $fromAmount, route[i], tokenService);
            $fromAmount = $step.toAmount;
            $fromToken = $step.to;
            $route.push($step);
        }
        calcUsdFromRoute($route);
        let $stepFirst = $route[0];
        //console.log('LAST STEP for ', fromToken.symbol, $step);
        return {
            outToken: $step.to,
            outAmount: $step.toAmount,
            outUsd: $step.toUsd,
            outUsdPrice: $step.toPrice,
            inToken: $stepFirst.from,
            inAmount: $stepFirst.fromAmount,
            inUsd: $stepFirst.fromUsd,
            inUsdPrice: $stepFirst.fromPrice,
            route: $route,
        };
    }
    TokenPrice.swapRouted = swapRouted;
    function calcUsdFromRoute(route) {
        let knownUsd = route.find(x => x.fromUsd != null || x.toUsd != null);
        if (knownUsd == null) {
            return;
        }
        let knownUsdI = route.indexOf(knownUsd);
        for (let i = knownUsdI - 1; i > -1; i--) {
            let knownPrice = route[i + 1];
            let prev = route[i];
            prev.toUsd = knownPrice.fromUsd;
            prev.toPrice = TokenUtils_1.TokenUtils.calcPrice(prev.toAmount, prev.to, prev.toUsd);
            prev.fromUsd = prev.toUsd;
            prev.fromPrice = TokenUtils_1.TokenUtils.calcPrice(prev.fromAmount, prev.from, prev.fromUsd);
        }
        for (let i = knownUsdI + 1; i < route.length; i++) {
            let knownPrice = route[i - 1];
            let next = route[i];
            next.fromUsd = knownPrice.toUsd;
            next.fromPrice = TokenUtils_1.TokenUtils.calcPrice(next.fromAmount, next.from, next.fromUsd);
            next.toUsd = next.fromUsd;
            next.toPrice = TokenUtils_1.TokenUtils.calcPrice(next.toAmount, next.to, next.toUsd);
        }
    }
    async function calcPrices(swapped) {
    }
    TokenPrice.calcPrices = calcPrices;
    async function calcSwap(fromToken, fromAmount, lp, tokenService) {
        let fromTokenAddress = lp.from.address;
        let toTokenAddress = lp.to.address;
        if (_address_1.$address.eq(fromTokenAddress, fromToken.address) === false) {
            throw new Error(`TP: Invalid from token addres ${fromTokenAddress} != ${fromToken.address}`);
        }
        let [fromI, toI] = BigInt(fromToken.address) < BigInt(toTokenAddress) ? [0, 1] : [1, 0];
        let toToken = lp.to;
        let reserveFrom = lp.reserves[`_reserve${fromI}`];
        let reserveTo = lp.reserves[`_reserve${toI}`];
        let k = reserveFrom * reserveTo;
        let reserveFromAfter = reserveFrom + fromAmount;
        let reserveToAfter = k / reserveFromAfter;
        let amountActual = reserveTo - reserveToAfter;
        let fromUsd = TokenUtils_1.TokenUtils.calcUsdIfStable(fromAmount, fromToken);
        let toUsd = TokenUtils_1.TokenUtils.calcUsdIfStable(amountActual, toToken);
        let fromPrice = TokenUtils_1.TokenUtils.calcPrice(fromAmount, fromToken, fromUsd ?? toUsd);
        let toPrice = TokenUtils_1.TokenUtils.calcPrice(amountActual, toToken, toUsd ?? fromUsd);
        //console.log('FromPice', fromPrice, fromAmount, fromToken, fromUsd, toUsd);
        _logger_1.$logger.log(`Swap: ${fromToken.symbol}(${fromAmount})[${fromUsd}$] > ${toToken.symbol} (${amountActual})[${toUsd}$]; Price ${fromToken.symbol}: ${fromPrice}`);
        return {
            from: lp.from,
            fromAmount: fromAmount,
            fromUsd: fromUsd ?? toUsd,
            fromPrice,
            to: lp.to,
            toAmount: amountActual,
            toUsd: toUsd ?? fromUsd,
            toPrice,
            usd: 0,
            date: new Date(Number(lp.reserves._blockTimestampLast * 1000)),
            pool: {
                address: lp.address,
                reserve0: lp.reserves._reserve0,
                reserve1: lp.reserves._reserve1,
            }
        };
    }
    TokenPrice.calcSwap = calcSwap;
})(TokenPrice || (TokenPrice = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_tokens_TokenPriceService === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_tokens_TokenPriceService) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_tokens_TokenPriceService, module.exports);
    } else {
        _dequanto_src_tokens_TokenPriceService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CToken;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CToken != null ? _src_commands_list_CToken : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CToken = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _validate_1 = _src_utils__validate;
const _console_1 = _src_utils__console;
const _is_1 = _dequanto_src_utils__is;
const TokenPriceService_1 = _dequanto_src_tokens_TokenPriceService;
exports.CToken = {
    command: 'token',
    description: [
        'Get token info'
    ],
    subcommands: [
        {
            command: 'price',
            example: '0xweb token price ETH -b <blockNumber>',
            description: [
                'Get token price'
            ],
            arguments: [
                {
                    name: '<token>',
                    description: 'Token symbol or token address',
                    required: true,
                }
            ],
            params: {
                '-b, --block': {
                    description: 'Price at specific block. Default: latest',
                    map: Number
                }
            },
            async process(args, params, app) {
                let [tokenMix] = args;
                _console_1.$console.toast(`Loading token ${tokenMix}`);
                let token = await app.chain.tokens.getToken(tokenMix, true);
                if (token == null && _is_1.$is.Address(tokenMix)) {
                    token = {
                        address: tokenMix,
                        decimals: 18,
                        platform: app.chain.client.platform,
                    };
                }
                if (token == null) {
                    throw new Error(`Token ${tokenMix} not found`);
                }
                _console_1.$console.toast(`Loading price`);
                let service = a_di_1.default.resolve(TokenPriceService_1.TokenPriceService, app.chain.client, app.chain.explorer);
                let priceData = await service.getPrice(token, {
                    block: params.block,
                });
                _console_1.$console.table([
                    ['Symbol', token.symbol],
                    ['Address', token.address],
                    ['Decimals', token.decimals.toString()],
                    ['Price', `green<${priceData.price}>`]
                ]);
            }
        },
    ],
    params: {
        '-c, --chain': {
            description: `Default: eth. Available: ${_validate_1.$validate.platforms.join(', ')}`
        }
    },
    async process(args, params, app) {
        console.warn(`Command for an "token" not found: ${args[0]}. Call "0xweb token --help" to view the list of commands`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CToken === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CToken) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CToken, module.exports);
    } else {
        _src_commands_list_CToken = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CGas;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CGas != null ? _src_commands_list_CGas : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGas = void 0;
const _console_1 = _src_utils__console;
const _validate_1 = _src_utils__validate;
const _bigint_1 = _dequanto_src_utils__bigint;
exports.CGas = {
    command: 'gas',
    description: [
        'Print current GAS price for a chain'
    ],
    params: {
        '-c, --chain': {
            description: `Default: eth. Available: ${_validate_1.$validate.platforms.join(', ')}`
        }
    },
    async process(args, params, app) {
        let gasData = await app.chain.client.getGasPrice();
        let gwei = _bigint_1.$bigint.toGweiFromWei(gasData.price);
        _console_1.$console.table([
            ['Chain', app.chain.client.platform],
            ['Price', gwei.toString() + ' gwei']
        ]);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CGas === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CGas) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CGas, module.exports);
    } else {
        _src_commands_list_CGas = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_safe_GnosisSafeFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_safe_GnosisSafeFactory != null ? _dequanto_src_safe_GnosisSafeFactory : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisSafeFactory = void 0;
const safe_core_sdk_1 = require("@gnosis.pm/safe-core-sdk");
const _gnosis_1 = _dequanto_src_safe__gnosis;
const GnosisSafeHandler_1 = _dequanto_src_safe_GnosisSafeHandler;
class GnosisSafeFactory {
    static async create(owner, client, config) {
        const ethAdapter = await _gnosis_1.$gnosis.getAdapter(owner, client);
        const safeFactory = await safe_core_sdk_1.SafeFactory.create({
            ethAdapter,
            contractNetworks: config.contracts
        });
        const safeAccountConfig = {
            owners: config.owners,
            threshold: config.threshold ?? config.owners.length,
        };
        const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
        const safe = new GnosisSafeHandler_1.GnosisSafeHandler({
            safeAddress: safeSdk.getAddress(),
            owner: owner,
            client: client,
        });
        return safe;
    }
}
exports.GnosisSafeFactory = GnosisSafeFactory;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_safe_GnosisSafeFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_safe_GnosisSafeFactory) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_safe_GnosisSafeFactory, module.exports);
    } else {
        _dequanto_src_safe_GnosisSafeFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_ContractProvider;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_ContractProvider != null ? _dequanto_src_contracts_ContractProvider : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractProvider = void 0;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
class ContractProvider {
    constructor(api = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        this.api = api;
    }
    async getByName(name) {
        let info = this.api.localDb.find(x => x.name === name);
        let { abi } = await this.api.getContractAbi(info.address);
        return {
            ...info,
            abi
        };
    }
    async getByAddress(address) {
        let info = await this.getInfo(address);
        if (info == null) {
            throw new Error(`Contract info not found for ${address}`);
        }
        let abi = await this.getAbi(info.address);
        return {
            ...info,
            abi
        };
    }
    async getAbi(address) {
        let { abi } = await this.api.getContractAbi(address);
        return abi;
    }
    async getInfo(q) {
        return this.api.getContractMeta(q);
    }
}
exports.ContractProvider = ContractProvider;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_ContractProvider === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_ContractProvider) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_ContractProvider, module.exports);
    } else {
        _dequanto_src_contracts_ContractProvider = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_src_contracts_TxContract;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_src_contracts_TxContract != null ? _dequanto_src_contracts_TxContract : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxContract = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const ethers_1 = require("ethers");
const ContractProvider_1 = _dequanto_src_contracts_ContractProvider;
class TxContract {
    constructor(explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        this.explorer = explorer;
        this.provider = a_di_1.default.resolve(ContractProvider_1.ContractProvider, this.explorer);
    }
    async parseTrasaction(tx) {
        const abi = await this.provider.getAbi(tx.to);
        return this.parseTrasactionWithAbi(tx, abi);
    }
    async parseTrasactionWithAbi(tx, abi) {
        const inter = new ethers_1.utils.Interface(abi);
        const decodedInput = inter.parseTransaction({
            data: tx.input,
            value: tx.value,
        });
        return decodedInput;
    }
    async parseTrasactions(arr) {
        let mapped = await (0, alot_1.default)(arr).mapAsync(async (tx) => {
            let details = await this.parseTrasaction(tx);
            return {
                ...tx,
                details: details
            };
        }).toArrayAsync();
        return mapped;
    }
}
exports.TxContract = TxContract;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_src_contracts_TxContract === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_src_contracts_TxContract) && __isObj(module.exports)) {
        Object.assign(_dequanto_src_contracts_TxContract, module.exports);
    } else {
        _dequanto_src_contracts_TxContract = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_openzeppelin_ERC20;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_openzeppelin_ERC20 != null ? _dequanto_contracts_openzeppelin_ERC20 : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = void 0;
/**
 *  AUTO-Generated Class: 2022-08-11 11:20
 *  Implementation: https://etherscan.io/address/undefined#code
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
class ERC20 extends ContractBase_1.ContractBase {
    constructor(address = '', client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client), explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
    }
    // 0xdd62ed3e
    async allowance(owner, spender) {
        return this.$read('function allowance(address, address) returns uint256', owner, spender);
    }
    // 0x095ea7b3
    async approve(sender, spender, amount) {
        return this.$write(this.$getAbiItem('function', 'approve'), sender, spender, amount);
    }
    // 0x70a08231
    async balanceOf(account) {
        return this.$read('function balanceOf(address) returns uint256', account);
    }
    // 0x313ce567
    async decimals() {
        return this.$read('function decimals() returns uint8');
    }
    // 0xa457c2d7
    async decreaseAllowance(sender, spender, subtractedValue) {
        return this.$write(this.$getAbiItem('function', 'decreaseAllowance'), sender, spender, subtractedValue);
    }
    // 0x39509351
    async increaseAllowance(sender, spender, addedValue) {
        return this.$write(this.$getAbiItem('function', 'increaseAllowance'), sender, spender, addedValue);
    }
    // 0x06fdde03
    async name() {
        return this.$read('function name() returns string');
    }
    // 0x95d89b41
    async symbol() {
        return this.$read('function symbol() returns string');
    }
    // 0x18160ddd
    async totalSupply() {
        return this.$read('function totalSupply() returns uint256');
    }
    // 0xa9059cbb
    async transfer(sender, to, amount) {
        return this.$write(this.$getAbiItem('function', 'transfer'), sender, to, amount);
    }
    // 0x23b872dd
    async transferFrom(sender, from, to, amount) {
        return this.$write(this.$getAbiItem('function', 'transferFrom'), sender, from, to, amount);
    }
    onApproval(fn) {
        return this.$on('Approval', fn);
    }
    onTransfer(fn) {
        return this.$on('Transfer', fn);
    }
    extractLogsApproval(tx) {
        let abi = this.$getAbiItem('event', 'Approval');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransfer(tx) {
        let abi = this.$getAbiItem('event', 'Transfer');
        return this.$extractLogs(tx, abi);
    }
    async getPastLogsApproval(options) {
        let topic = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
        let abi = this.$getAbiItem('event', 'Approval');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsTransfer(options) {
        let topic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
        let abi = this.$getAbiItem('event', 'Transfer');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
}
exports.ERC20 = ERC20;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_openzeppelin_ERC20 === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_openzeppelin_ERC20) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_openzeppelin_ERC20, module.exports);
    } else {
        _dequanto_contracts_openzeppelin_ERC20 = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_services_InternalTokenService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_services_InternalTokenService != null ? _src_services_InternalTokenService : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalTokenService = void 0;
const ERC20_1 = _dequanto_contracts_openzeppelin_ERC20;
const atma_io_1 = require("atma-io");
const memd_1 = __importDefault(require("memd"));
class InternalTokenService {
    async getTokenData(address, client, explorer) {
        let erc20 = new ERC20_1.ERC20(address, client, explorer);
        let [symbol, name, decimals] = await Promise.all([
            erc20.symbol(),
            erc20.name(),
            erc20.decimals(),
        ]);
        return {
            symbol,
            name,
            decimals,
            address,
            platform: client.platform
        };
    }
}
__decorate([
    memd_1.default.deco.memoize({
        keyResolver(address, client, explorer) {
            return `${client.platform}:${address}`;
        },
        persistance: new memd_1.default.FsTransport({
            path: atma_io_1.env.appdataDir.combine('./0xweb/cache/tokens.json')
        })
    })
], InternalTokenService.prototype, "getTokenData", null);
exports.InternalTokenService = InternalTokenService;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_services_InternalTokenService === module.exports) {
        // do nothing if
    } else if (__isObj(_src_services_InternalTokenService) && __isObj(module.exports)) {
        Object.assign(_src_services_InternalTokenService, module.exports);
    } else {
        _src_services_InternalTokenService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_openzeppelin_ERC721;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_openzeppelin_ERC721 != null ? _dequanto_contracts_openzeppelin_ERC721 : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721 = void 0;
/**
 *  AUTO-Generated Class: 2022-08-11 11:20
 *  Implementation: https://etherscan.io/address/undefined#code
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
class ERC721 extends ContractBase_1.ContractBase {
    constructor(address = '', client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client), explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    }
    // 0x095ea7b3
    async approve(sender, to, tokenId) {
        return this.$write(this.$getAbiItem('function', 'approve'), sender, to, tokenId);
    }
    // 0x70a08231
    async balanceOf(owner) {
        return this.$read('function balanceOf(address) returns uint256', owner);
    }
    // 0x081812fc
    async getApproved(tokenId) {
        return this.$read('function getApproved(uint256) returns address', tokenId);
    }
    // 0xe985e9c5
    async isApprovedForAll(owner, operator) {
        return this.$read('function isApprovedForAll(address, address) returns bool', owner, operator);
    }
    // 0x06fdde03
    async name() {
        return this.$read('function name() returns string');
    }
    // 0x6352211e
    async ownerOf(tokenId) {
        return this.$read('function ownerOf(uint256) returns address', tokenId);
    }
    async safeTransferFrom(sender, ...args) {
        let abi = this.$getAbiItemOverload(['function safeTransferFrom(address, address, uint256)', 'function safeTransferFrom(address, address, uint256, bytes)'], args);
        return this.$write(abi, sender, ...args);
    }
    // 0xa22cb465
    async setApprovalForAll(sender, operator, approved) {
        return this.$write(this.$getAbiItem('function', 'setApprovalForAll'), sender, operator, approved);
    }
    // 0x01ffc9a7
    async supportsInterface(interfaceId) {
        return this.$read('function supportsInterface(bytes4) returns bool', interfaceId);
    }
    // 0x95d89b41
    async symbol() {
        return this.$read('function symbol() returns string');
    }
    // 0xc87b56dd
    async tokenURI(tokenId) {
        return this.$read('function tokenURI(uint256) returns string', tokenId);
    }
    // 0x23b872dd
    async transferFrom(sender, from, to, tokenId) {
        return this.$write(this.$getAbiItem('function', 'transferFrom'), sender, from, to, tokenId);
    }
    onApproval(fn) {
        return this.$on('Approval', fn);
    }
    onApprovalForAll(fn) {
        return this.$on('ApprovalForAll', fn);
    }
    onTransfer(fn) {
        return this.$on('Transfer', fn);
    }
    extractLogsApproval(tx) {
        let abi = this.$getAbiItem('event', 'Approval');
        return this.$extractLogs(tx, abi);
    }
    extractLogsApprovalForAll(tx) {
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransfer(tx) {
        let abi = this.$getAbiItem('event', 'Transfer');
        return this.$extractLogs(tx, abi);
    }
    async getPastLogsApproval(options) {
        let topic = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
        let abi = this.$getAbiItem('event', 'Approval');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsApprovalForAll(options) {
        let topic = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsTransfer(options) {
        let topic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
        let abi = this.$getAbiItem('event', 'Transfer');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
}
exports.ERC721 = ERC721;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_openzeppelin_ERC721 === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_openzeppelin_ERC721) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_openzeppelin_ERC721, module.exports);
    } else {
        _dequanto_contracts_openzeppelin_ERC721 = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _dequanto_contracts_openzeppelin_ERC1155;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _dequanto_contracts_openzeppelin_ERC1155 != null ? _dequanto_contracts_openzeppelin_ERC1155 : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC1155 = void 0;
/**
 *  AUTO-Generated Class: 2022-08-11 11:20
 *  Implementation: https://etherscan.io/address/undefined#code
 */
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const ContractBase_1 = _dequanto_src_contracts_ContractBase;
const Etherscan_1 = _dequanto_src_BlockchainExplorer_Etherscan;
const EthWeb3Client_1 = _dequanto_src_clients_EthWeb3Client;
class ERC1155 extends ContractBase_1.ContractBase {
    constructor(address = '', client = a_di_1.default.resolve(EthWeb3Client_1.EthWeb3Client), explorer = a_di_1.default.resolve(Etherscan_1.Etherscan)) {
        super(address, client, explorer);
        this.address = address;
        this.client = client;
        this.explorer = explorer;
        this.abi = [{ "inputs": [{ "internalType": "string", "name": "uri_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }];
    }
    // 0x00fdd58e
    async balanceOf(account, id) {
        return this.$read('function balanceOf(address, uint256) returns uint256', account, id);
    }
    // 0x4e1273f4
    async balanceOfBatch(accounts, ids) {
        return this.$read('function balanceOfBatch(address[], uint256[]) returns uint256[]', accounts, ids);
    }
    // 0xe985e9c5
    async isApprovedForAll(account, operator) {
        return this.$read('function isApprovedForAll(address, address) returns bool', account, operator);
    }
    // 0x2eb2c2d6
    async safeBatchTransferFrom(sender, from, to, ids, amounts, data) {
        return this.$write(this.$getAbiItem('function', 'safeBatchTransferFrom'), sender, from, to, ids, amounts, data);
    }
    // 0xf242432a
    async safeTransferFrom(sender, from, to, id, amount, data) {
        return this.$write(this.$getAbiItem('function', 'safeTransferFrom'), sender, from, to, id, amount, data);
    }
    // 0xa22cb465
    async setApprovalForAll(sender, operator, approved) {
        return this.$write(this.$getAbiItem('function', 'setApprovalForAll'), sender, operator, approved);
    }
    // 0x01ffc9a7
    async supportsInterface(interfaceId) {
        return this.$read('function supportsInterface(bytes4) returns bool', interfaceId);
    }
    // 0x0e89341c
    async uri(input0) {
        return this.$read('function uri(uint256) returns string', input0);
    }
    onApprovalForAll(fn) {
        return this.$on('ApprovalForAll', fn);
    }
    onTransferBatch(fn) {
        return this.$on('TransferBatch', fn);
    }
    onTransferSingle(fn) {
        return this.$on('TransferSingle', fn);
    }
    onURI(fn) {
        return this.$on('URI', fn);
    }
    extractLogsApprovalForAll(tx) {
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransferBatch(tx) {
        let abi = this.$getAbiItem('event', 'TransferBatch');
        return this.$extractLogs(tx, abi);
    }
    extractLogsTransferSingle(tx) {
        let abi = this.$getAbiItem('event', 'TransferSingle');
        return this.$extractLogs(tx, abi);
    }
    extractLogsURI(tx) {
        let abi = this.$getAbiItem('event', 'URI');
        return this.$extractLogs(tx, abi);
    }
    async getPastLogsApprovalForAll(options) {
        let topic = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';
        let abi = this.$getAbiItem('event', 'ApprovalForAll');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsTransferBatch(options) {
        let topic = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb';
        let abi = this.$getAbiItem('event', 'TransferBatch');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsTransferSingle(options) {
        let topic = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';
        let abi = this.$getAbiItem('event', 'TransferSingle');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
    async getPastLogsURI(options) {
        let topic = '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b';
        let abi = this.$getAbiItem('event', 'URI');
        let filters = await this.$getPastLogsFilters(abi, {
            topic,
            ...options
        });
        let logs = await this.$getPastLogs(filters);
        return logs.map(log => this.$extractLog(log, abi));
    }
}
exports.ERC1155 = ERC1155;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_dequanto_contracts_openzeppelin_ERC1155 === module.exports) {
        // do nothing if
    } else if (__isObj(_dequanto_contracts_openzeppelin_ERC1155) && __isObj(module.exports)) {
        Object.assign(_dequanto_contracts_openzeppelin_ERC1155, module.exports);
    } else {
        _dequanto_contracts_openzeppelin_ERC1155 = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__tx;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__tx != null ? _src_utils__tx : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$tx = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const _require_1 = _dequanto_src_utils__require;
const _console_1 = _src_utils__console;
const _date_1 = _dequanto_src_utils__date;
const _block_1 = _dequanto_src_utils__block;
const _gas_1 = _dequanto_src_utils__gas;
const InputDataUtils_1 = _dequanto_src_contracts_utils_InputDataUtils;
const TxContract_1 = _dequanto_src_contracts_TxContract;
const _bigint_1 = _dequanto_src_utils__bigint;
const _number_1 = _dequanto_src_utils__number;
const InternalTokenService_1 = _src_services_InternalTokenService;
const TokenPriceService_1 = _dequanto_src_tokens_TokenPriceService;
const TxLogParser_1 = _dequanto_src_txs_receipt_TxLogParser;
const ContractAbiProvider_1 = _dequanto_src_contracts_ContractAbiProvider;
const ERC20_1 = _dequanto_contracts_openzeppelin_ERC20;
const ERC721_1 = _dequanto_contracts_openzeppelin_ERC721;
const _abiUtils_1 = _dequanto_src_utils__abiUtils;
const ERC1155_1 = _dequanto_contracts_openzeppelin_ERC1155;
var $tx;
(function ($tx) {
    async function log(client, explorer, hash, tx, receipt) {
        _require_1.$require.TxHash(hash, `Not valid hash bold<${hash}>`);
        if (tx == null) {
            _console_1.$console.toast(`Fetch Tx ${hash}`);
            tx = await client.getTransaction(hash);
            if (tx == null) {
                _console_1.$console.log(`red<Transaction bold<${hash}> not found (${client.platform})>`);
                return;
            }
        }
        if (receipt == null) {
            _console_1.$console.toast(`Fetch Tx Receipt ${hash}`);
            receipt = await client.getTransactionReceipt(hash);
            if (receipt == null) {
                _console_1.$console.log('yellow<Transaction is still not mined>');
            }
        }
        let data = InputDataUtils_1.InputDataUtils.split(tx.input ?? '');
        let block = receipt == null
            ? null
            : await client.getBlock(receipt.blockNumber);
        _console_1.$console.log(`\ncyan<bold<Transaction>>\n`);
        _console_1.$console.table([
            ['Status', receipt == null ? 'yellow<mining>' : (receipt.status ? 'green<OK>' : 'red<ERROR>')],
            ...(block ? [
                ['Block', `#${block.number} yellow<${_date_1.$date.format(_block_1.$block.getDate(block), 'dd-MM-yyyy HH:mm:ss')}>`]
            ] : []),
            ['Tx', `cyan<${hash}>`],
            ['From', tx.from],
            ['To', tx.to],
            ['Nonce', tx.nonce],
            ['Value', tx.value?.toString() ?? 0],
            ['Data', ''],
            ...(data.method ? [
                ['   Method', `gray<${data.method}>`],
                ['   Arguments', data.args.map(x => `gray<${x}>`).join('\n')],
            ] : []),
            ['Gas', _gas_1.$gas.formatUsed(tx, receipt)]
        ]);
        let abi;
        if (data.method) {
            let resolver = new ContractAbiProvider_1.ContractAbiProvider(client, explorer);
            let result = await resolver.getAbi(tx.to);
            abi = result.abiJson;
        }
        let parser = a_di_1.default.resolve(TxLogParser_1.TxLogParser);
        if (abi != null) {
            //parser.topics.register(abi);
        }
        let logs = await parser.parse(receipt);
        let knownLogs = logs.filter(x => x != null);
        let transfers = knownLogs.filter(x => x.event === 'Transfer');
        if (transfers.length > 0) {
            let tokenService = new InternalTokenService_1.InternalTokenService();
            let tokenPriceService = new TokenPriceService_1.TokenPriceService(client, explorer);
            console.log('Transfer ev');
            console.dir(transfers);
            console.dir(transfers[0].arguments);
            let IERC721 = new ERC721_1.ERC721().abi;
            let IERC1155 = new ERC1155_1.ERC1155().abi;
            let IERC20 = new ERC20_1.ERC20().abi;
            console.log(_abiUtils_1.$abiUtils.checkInterfaceOf(abi, IERC721), '???? IERC721');
            console.log(_abiUtils_1.$abiUtils.checkInterfaceOf(abi, IERC1155), '???? IERC1155');
            console.log(_abiUtils_1.$abiUtils.checkInterfaceOf(abi, IERC20), '???? IERC20');
            let events = await (0, alot_1.default)(transfers)
                //.filter(x => $is.Address(x.token?.symbol))
                .mapAsync(async (transfer) => {
                if (transfer.token == null) {
                    let IERC20 = new ERC20_1.ERC20(transfer.address, client);
                    if (_abiUtils_1.$abiUtils.checkInterfaceOf(abi, IERC20.abi).ok) {
                        let symbol = await IERC20.symbol();
                        transfer.token = {
                            symbol: symbol,
                            address: transfer.address,
                            type: 'ERC20'
                        };
                    }
                    else {
                        let IERC721 = new ERC721_1.ERC721(transfer.address, client);
                        if (_abiUtils_1.$abiUtils.checkInterfaceOf(abi, IERC721.abi).ok) {
                            let [name, symbol] = await Promise.all([
                                IERC721.name(),
                                IERC721.symbol(),
                            ]);
                            console.log('>>>', name, symbol);
                            transfer.token = {
                                name: name,
                                symbol: symbol,
                                address: transfer.address,
                                type: 'ERC721'
                            };
                        }
                    }
                    // let IERC721 = new ERC721().abi;
                    // let IERC1155 = new ERC1155().abi;
                    // console.log($abiUtils.isInterfaceOf(abi, IERC721), '???? IERC721');
                    // console.log($abiUtils.isInterfaceOf(abi, IERC1155), '???? IERC1155');
                    // console.log($abiUtils.isInterfaceOf(abi, IERC20), '???? IERC20');
                }
                console.log('transfer received', transfer);
                try {
                    let token = await tokenService.getTokenData(transfer.token.symbol, client, explorer);
                    let price = await tokenPriceService.getPrice(token, {
                        amountWei: transfer.amount
                    });
                    return {
                        ...transfer,
                        token: token,
                        usd: _number_1.$number.round(price.price ?? 0, 2) || '?'
                    };
                }
                catch (error) {
                    return {
                        ...transfer,
                        usd: '?',
                    };
                }
            })
                .toArrayAsync({ errors: 'include' });
            _console_1.$console.log(`\ncyan<bold<Transfers>>\n`);
            let cells = events.map(event => {
                console.log(event);
                return [
                    event.token?.symbol,
                    event.from,
                    event.to,
                    event.amount != null
                        ? _bigint_1.$bigint.toEther(event.amount, event.token?.decimals ?? 18)
                        : '',
                    `${event.usd}$`,
                ];
            });
            _console_1.$console.table([
                ['Token', 'From', 'To', 'Amount'],
                ['-----', '----', '--', '------'],
                ...cells
            ]);
        }
        let otherEvents = knownLogs.filter(x => x.event !== 'Transfer');
        if (otherEvents.length > 0) {
            _console_1.$console.log(`\ncyan<bold<Known Events>>\n`);
            let cells = otherEvents.map(event => {
                return [
                    JSON.stringify(event)
                ];
            });
            _console_1.$console.table([
                ['Serialized Data'],
                ['----------------'],
                ...cells
            ]);
        }
        if (abi) {
            let txContract = new TxContract_1.TxContract(explorer);
            let decodedInput = await txContract.parseTrasactionWithAbi(tx, abi);
            _console_1.$console.log(`\ncyan<bold<Parameters parsed>>\n`);
            let cells = [
                ['Method', decodedInput.name]
            ];
            for (let key in decodedInput.args) {
                if (/^\d$/.test(key)) {
                    continue;
                }
                let val = decodedInput.args[key];
                if (Array.isArray(val)) {
                    val = val.map(x => x?.toString() ?? '<null>').join('\n');
                }
                cells.push([key, val ?? '<null>']);
            }
            _console_1.$console.table([
                ...cells
            ]);
        }
    }
    $tx.log = log;
})($tx = exports.$tx || (exports.$tx = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__tx === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__tx) && __isObj(module.exports)) {
        Object.assign(_src_utils__tx, module.exports);
    } else {
        _src_utils__tx = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CSafe;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CSafe != null ? _src_commands_list_CSafe : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSafe = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const alot_1 = __importDefault(require("alot"));
const AccountsService_1 = _src_services_AccountsService;
const _console_1 = _src_utils__console;
const _address_1 = _dequanto_src_utils__address;
const GnosisSafeFactory_1 = _dequanto_src_safe_GnosisSafeFactory;
const _require_1 = _dequanto_src_utils__require;
const CAccounts_1 = _src_commands_list_CAccounts;
const atma_io_1 = require("atma-io");
const Paramsters_1 = _src_utils_Paramsters;
const GnosisSafeHandler_1 = _dequanto_src_safe_GnosisSafeHandler;
const TxDataBuilder_1 = _dequanto_src_txs_TxDataBuilder;
const FileServiceTransport_1 = _dequanto_src_safe_transport_FileServiceTransport;
const _tx_1 = _src_utils__tx;
exports.CSafe = {
    command: 'safe',
    description: [
        'Multi-sig account tools.'
    ],
    subcommands: [
        {
            command: 'add',
            description: [
                'Add existing safe.'
            ],
            params: {
                '-o, --owner': {
                    description: 'Owners address or name. The EOA should be already present.',
                    required: true,
                },
                '-a, --address': {
                    description: 'Safe address',
                    required: true
                },
                '-n, --name': {
                    description: 'Name of the account',
                    required: true,
                }
            },
            async process(args, params, app) {
                let { owner, address, name, chain } = params;
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let accounts = await service.add({
                    type: 'safe',
                    name,
                    address,
                    operator: _address_1.$address.isValid(owner) ? {
                        address: owner
                    } : {
                        name: owner
                    },
                    platform: chain
                });
                let str = accounts.map(x => ` * ${x.name} [${x.address}]`).join('\n');
                _console_1.$console.log(`Accounts:`);
                _console_1.$console.log(str);
            }
        },
        CAccounts_1.CAccounts.subcommands.find(x => x.command === 'remove'),
        {
            command: 'list',
            description: [
                'List safe account names'
            ],
            async process(args, params, app) {
                let service = a_di_1.default.resolve(AccountsService_1.AccountsService, app.config);
                let accounts = await service.list();
                accounts = accounts.filter(x => x.type === 'safe');
                if (accounts.length === 0) {
                    console.warn(`No accounts added. Add with "0xweb accounts add -n <name> -a <address> -k <key> -p <pin>"`);
                    return;
                }
                let str = accounts.map(x => ` - ${x.name} [${x.address}]`).join('\n');
                _console_1.$console.log(str);
            }
        },
        {
            command: 'new',
            description: [
                'Deploy new safe'
            ],
            params: {
                '-n, --name': {
                    description: 'Name of the account to create.',
                    required: true,
                },
                '-o, --owner': {
                    description: 'Address or name of the owner. It should be already present.',
                    required: true,
                },
                '-m, --members': {
                    description: 'Additional owners. Comma-seperated addresses.',
                    default: [],
                    map(line) {
                        return line.split(',').map(x => x.trim()).filter(Boolean);
                    }
                },
                '--contracts': {
                    description: 'Optionally, JSON serialized file with multiSend, masterCopy and proxyFactory contracts'
                }
            },
            async process(args, params, app) {
                let contracts = null;
                if (params.contracts) {
                    contracts = await atma_io_1.File.readAsync(params.contracts);
                }
                let account = await app.chain.accounts.get(params.owner, params.chain);
                _require_1.$require.notNull(account, `Account ${params.owner} not found`);
                let owners = (0, alot_1.default)([
                    account.address,
                    ...params.members
                ])
                    .distinct()
                    .forEach(owner => _require_1.$require.Address(owner))
                    .toArray();
                let gnosisSafe = await GnosisSafeFactory_1.GnosisSafeFactory.create(account, app.chain.client, {
                    owners,
                    contracts: {
                        [app.chain.client.chainId]: contracts ?? void 0
                    },
                });
                _console_1.$console.log(`bold<Created green<${gnosisSafe.safeAddress}>>`);
                let addCommand = exports.CSafe.subcommands.find(x => x.command === 'add');
                await addCommand.process(args, {
                    owner: params.owner,
                    address: gnosisSafe.safeAddress,
                    name: params.name,
                    chain: params.chain,
                }, app);
            }
        },
        {
            command: 'sign',
            description: [
                'Add confirmations to the multisig transaction in a JSON file'
            ],
            arguments: [
                {
                    description: `Path to a Tx JSON file`,
                    required: true
                }
            ],
            params: {
                ...Paramsters_1.Parameters.account(),
            },
            async process(args, params, app) {
                let [path] = args;
                let client = app.chain.client;
                let account = await app.chain.accounts.get(params.account);
                _require_1.$require.notNull(account, `Account ${params.account} not found`);
                _require_1.$require.True(await atma_io_1.File.existsAsync(path), `File bold<${path}> does not exist`);
                let safeWorker = new SafeWorker(path, this.client, account);
                await safeWorker.sign();
            }
        },
        {
            command: 'submit,send',
            description: [
                'Sends a tx from the file to the blockchain. All confirmations should be already included in the file'
            ],
            arguments: [
                {
                    description: `Path to a Tx JSON file`,
                    required: true
                }
            ],
            params: {
                ...Paramsters_1.Parameters.account(),
            },
            async process(args, params, app) {
                let [path] = args;
                let client = app.chain.client;
                let account = await app.chain.accounts.get(params.account);
                _require_1.$require.notNull(account, `Account ${params.account} not found`);
                _require_1.$require.True(await atma_io_1.File.existsAsync(path), `File bold<${path}> does not exist`);
                let safeWorker = new SafeWorker(path, this.client, account);
                _console_1.$console.toast('Sending transaction');
                let tx = await safeWorker.send();
                let hash = await tx.onSent;
                _console_1.$console.toast(`Transaction ${hash} sent. Waiting for receipt`);
                let receipt = await tx.onCompleted;
                await _tx_1.$tx.log(client, app.chain.explorer, hash, null, receipt);
            }
        },
    ],
    params: {
        ...Paramsters_1.Parameters.pin,
        ...Paramsters_1.Parameters.chain,
    },
    async process(args, params, app) {
        console.warn(`Command for an "accounts" not found: ${args[0]}. Call "0xweb accounts --help" to view the list of commands`);
    }
};
class SafeWorker {
    constructor(path, client, account) {
        this.path = path;
        this.client = client;
        this.account = account;
    }
    async send() {
        let { json, gnosis } = await this.load();
        return gnosis.submitTransaction(json.safeTxHash);
    }
    async sign() {
        let client = this.client;
        let path = this.path;
        let account = this.account;
        let { json, gnosis } = await this.load();
        let confirmation = await gnosis.createTxSignature(json.safeTxHash);
        let confirmations = json.confirmations;
        if (confirmations == null) {
            confirmations = json.confirmations = [];
        }
        let has = confirmations.find(x => _address_1.$address.eq(x.signature?.signer, this.account.address));
        if (has) {
            throw new Error(`Signature for ${this.account.address} already exists`);
        }
        confirmations.push(confirmation);
        await atma_io_1.File.writeAsync(path, json);
    }
    async load() {
        let { client, account, path } = this;
        _require_1.$require.True(await atma_io_1.File.existsAsync(path), `File bold<${path}> does not exist`);
        let json = await atma_io_1.File.readAsync(path);
        _require_1.$require.Address(json.safeAddress, `No "safeAddress" field in the json file: ${path}`);
        let gnosis = a_di_1.default.resolve(GnosisSafeHandler_1.GnosisSafeHandler, {
            owner: account,
            safeAddress: json.safeAddress,
            client: this.client,
            transport: new FileServiceTransport_1.FileServiceTransport(this.client, account, path)
        });
        let safeTxHash = json.safeTxHash;
        if (safeTxHash == null) {
            // ensure safeTxHash
            let builder = TxDataBuilder_1.TxDataBuilder.fromJSON(client, account, {
                tx: json.tx,
                config: json.config
            });
            let { safeTxHash: hash } = await gnosis.createTxHash(builder);
            safeTxHash = hash;
            json.safeTxHash = safeTxHash;
            await atma_io_1.File.writeAsync(path, json);
        }
        return {
            json,
            gnosis
        };
    }
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CSafe === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CSafe) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CSafe, module.exports);
    } else {
        _src_commands_list_CSafe = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CTransfer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CTransfer != null ? _src_commands_list_CTransfer : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTransfer = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const _console_1 = _src_utils__console;
const _is_1 = _dequanto_src_utils__is;
const TokenTransferService_1 = _dequanto_src_tokens_TokenTransferService;
const _bigint_1 = _dequanto_src_utils__bigint;
const FileServiceTransport_1 = _dequanto_src_safe_transport_FileServiceTransport;
const Paramsters_1 = _src_utils_Paramsters;
const _logger_1 = _dequanto_src_utils__logger;
exports.CTransfer = {
    command: 'transfer',
    example: '0xweb transfer 0.1 ETH --from 0x... --to 0x... ',
    description: [
        'Transfer ETH or ERC20'
    ],
    arguments: [
        {
            name: '<amount>',
            description: 'Amount in ETHER, or percents. Supports negative values to leave rest amounts at sender account',
            required: true,
        },
        {
            name: '<token>',
            description: 'Token symbol or token address',
            required: true,
        }
    ],
    params: {
        '-f, --from': {
            description: 'Senders name or address. ',
            required: true
        },
        '-t, --to': {
            description: 'Receivers name or address. ',
            required: true
        },
        ...Paramsters_1.Parameters.chain,
        ...Paramsters_1.Parameters.pin,
        '--safe-transport': {
            description: `Optionally the file path for multisig signatures, if collected manually, as per default Gnosis Safe Service is used.`,
        },
        '--sig-transport': {
            description: `Optionally the file where we save the tx and wait until the signature for the TX is provided.`,
        }
    },
    async process(args, params, app) {
        let [amountStr, tokenMix] = args;
        _console_1.$console.toast(`Loading token ${tokenMix}`);
        let token = await app.chain.tokens.getToken(tokenMix, true);
        if (token == null && _is_1.$is.Address(tokenMix)) {
            token = {
                address: tokenMix,
                decimals: 18,
                platform: app.chain.client.platform,
            };
        }
        if (token == null) {
            throw new Error(`Token ${tokenMix} not found`);
        }
        let accountFrom = await app.getAccount(params.from);
        if (accountFrom == null) {
            throw new Error(`Account ${params.from} not found in storage`);
        }
        let accountTo = _is_1.$is.Address(params.to)
            ? { address: params.to }
            : await app.getAccount(params.to);
        if (accountTo == null) {
            throw new Error(`Account ${params.to} not found in storage`);
        }
        if (accountTo.platform && accountTo.platform !== app.chain.client.platform) {
            throw new Error(`Chain missmatch. Account ${accountTo.address} required ${accountTo.platform}, but got ${app.chain.client.platform}`);
        }
        let service = a_di_1.default.resolve(TokenTransferService_1.TokenTransferService, app.chain.client);
        _console_1.$console.toast(`Loading current balance for ${accountFrom.address}`);
        let balance = await service.getBalance(accountFrom.address, token);
        _console_1.$console.log(`Account balance: ${_bigint_1.$bigint.toEther(balance, token.decimals)}`);
        let amount;
        let percents = /^(?<value>[\d\.]+)%$/.exec(amountStr);
        if (percents) {
            let p = Number(percents.groups.value);
            amount = _bigint_1.$bigint.multWithFloat(balance, p / 100);
        }
        else {
            let num = Number(amountStr);
            if (isNaN(num)) {
                throw new Error(`Invalid amount number ${amountStr}`);
            }
            amount = num;
        }
        if (!amount) {
            throw new Error(`Invalid amount: ${amountStr}`);
        }
        _console_1.$console.toast(`Transfering ${amount}${token.symbol} from ${accountFrom.address} to ${accountTo.address}`);
        let safeTransportFile = params.safeTransport;
        if (safeTransportFile) {
            service.$configWriter({
                safeTransport: new FileServiceTransport_1.FileServiceTransport(app.chain.client, accountFrom, safeTransportFile)
            });
        }
        let sigTransportFile = params.sigTransport;
        if (sigTransportFile) {
            service.$configWriter({
                sigTransport: sigTransportFile
            });
        }
        let tx = await service.transfer(accountFrom, accountTo.address, token, amount);
        let receipt = await tx.wait();
        (0, _logger_1.l) `Transfered. Receipt: bold<${receipt.transactionHash}>`;
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CTransfer === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CTransfer) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CTransfer, module.exports);
    } else {
        _src_commands_list_CTransfer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CTokens;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CTokens != null ? _src_commands_list_CTokens : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTokens = void 0;
const _validate_1 = _src_utils__validate;
const _console_1 = _src_utils__console;
const _require_1 = _dequanto_src_utils__require;
const ERC20_1 = _dequanto_contracts_openzeppelin_ERC20;
const alot_1 = __importDefault(require("alot"));
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const TokensService_1 = _dequanto_src_tokens_TokensService;
const TokenPriceService_1 = _dequanto_src_tokens_TokenPriceService;
const _bigint_1 = _dequanto_src_utils__bigint;
exports.CTokens = {
    command: 'tokens',
    description: [
        'Manage known tokens.'
    ],
    subcommands: [
        {
            command: 'add',
            example: '0xweb tokens add --address 0x... --symbol FRT --decimals 18 --chain eth',
            description: [
                'Add a new token to the known list.'
            ],
            params: {
                '-a, --address': {
                    description: 'Tokens address',
                    required: true,
                    validate: _require_1.$require.Address,
                },
                '-s, --symbol': {
                    description: 'Tokens symbol',
                    required: true
                },
                '-d, --decimals': {
                    description: 'Tokens decimals. Default: 18',
                    default: 18,
                    type: 'number'
                }
            },
            async process(args, params, app) {
                let { address, symbol, decimals, chain } = params;
                await app.chain.tokens.addKnownToken({
                    address,
                    symbol,
                    decimals,
                    platform: chain
                });
                _console_1.$console.log(`Added token ${symbol} [${address}] in ${chain}`);
            }
        },
        {
            command: 'find',
            example: '0xweb tokens find USDC',
            description: [
                'Get a token by Symbol or Address, and print the info'
            ],
            arguments: [
                {
                    name: '<symbol>'
                }
            ],
            params: {},
            async process(args, params, app) {
                let [query] = args;
                try {
                    let token = await app.chain.tokens.getKnownToken(query);
                    _console_1.$console.table([
                        ['Symbol', token.symbol],
                        ['Address', token.address],
                        ['Decimals', token.decimals],
                        ['Platform', token.platform],
                    ]);
                }
                catch (error) {
                    throw new Error(`Token '${query}' not found for '${params.chain}'`);
                }
            }
        },
        {
            command: 'for',
            example: '0xweb tokens for 0x...',
            description: [
                'Get all tokens for the address'
            ],
            arguments: [
                {
                    address: '<address>'
                }
            ],
            params: {},
            async process(args, params, app) {
                let [eoa] = args;
                _require_1.$require.Address(eoa, 'Provide the valid address to get the tokens for');
                _console_1.$console.toast('Loading Transfer events...');
                let erc20 = new ERC20_1.ERC20('', app.chain.client);
                let trasfers = await erc20.getPastLogsTransfer({
                    params: {
                        to: eoa
                    }
                });
                let tokenAddresses = (0, alot_1.default)(trasfers)
                    .map(x => x.address)
                    .distinct()
                    .toArray();
                _console_1.$console.log(`Got bold<cyan<${tokenAddresses.length}>> tokens for ${eoa}`);
                _console_1.$console.toast(`Loading tokens info...`);
                let tokensService = a_di_1.default.resolve(TokensService_1.TokensService, app.chain.platform);
                let tokens = await (0, alot_1.default)(tokenAddresses)
                    .mapAsync(async (address) => {
                    return tokensService.getKnownToken(address);
                })
                    .toArrayAsync({ errors: 'include' });
                let knownTokens = tokens
                    .filter(x => x instanceof Error === false);
                _console_1.$console.log(`Got bold<cyan<${knownTokens.length}>> known ERC20 tokens`);
                let priceService = a_di_1.default.resolve(TokenPriceService_1.TokenPriceService, app.chain.client, app.chain.explorer);
                _console_1.$console.toast(`Loading account balances...`);
                let balances = await (0, alot_1.default)(knownTokens)
                    .mapAsync(async (token) => {
                    _console_1.$console.toast(`Loading balance for ${token.symbol}...`);
                    let balance = await new ERC20_1.ERC20(token.address, app.chain.client).balanceOf(eoa);
                    let priceInfo = await priceService.getPrice(token, {
                        amountWei: balance
                    });
                    return {
                        token,
                        balance: _bigint_1.$bigint.toEther(balance, token.decimals),
                        priceInfo
                    };
                })
                    .toArrayAsync();
                let table = balances.map(result => {
                    return [
                        result.token.symbol ?? result.token.name,
                        result.token.address,
                        `${result.balance}`,
                        result.priceInfo.error
                            ? result.priceInfo.error.message
                            : `${result.priceInfo.price}$`,
                    ];
                });
                _console_1.$console.table([
                    ['Token', 'Address', 'Balance(Ξ)', '$'],
                    ...table,
                ]);
            }
        },
    ],
    params: {
        '-c, --chain': {
            description: `Default: eth. Available: ${_validate_1.$validate.platforms.join(', ')}`,
            required: true,
            oneOf: _validate_1.$validate.platforms
        }
    },
    async process(args, params, app) {
        console.warn(`Command for an "token" not found: ${args[0]}. Call "0xweb token --help" to view the list of commands`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CTokens === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CTokens) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CTokens, module.exports);
    } else {
        _src_commands_list_CTokens = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CTx;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CTx != null ? _src_commands_list_CTx : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTx = void 0;
const _console_1 = _src_utils__console;
const Paramsters_1 = _src_utils_Paramsters;
const TxDataBuilder_1 = _dequanto_src_txs_TxDataBuilder;
const _require_1 = _dequanto_src_utils__require;
const _sign_1 = _dequanto_src_utils__sign;
const atma_io_1 = require("atma-io");
const TxWriter_1 = _dequanto_src_txs_TxWriter;
const _tx_1 = _src_utils__tx;
exports.CTx = {
    command: 'tx',
    description: [
        'Transaction utils'
    ],
    subcommands: [
        {
            command: 'sign',
            description: [
                'Sign a transaction in a json file'
            ],
            arguments: [
                {
                    description: `Path to a Tx JSON file`,
                    required: true
                }
            ],
            params: {
                ...Paramsters_1.Parameters.account(),
                '--output, -o': {
                    description: 'Optional. Override the output file'
                }
            },
            async process(args, params, app) {
                let [path] = args;
                _require_1.$require.True(await atma_io_1.File.existsAsync(path), `File bold<${path}> does not exist`);
                let json = await atma_io_1.File.readAsync(path);
                let account = await app.getAccount(params.account);
                _require_1.$require.notNull(account, `Account ${params.account} not found`);
                let builder = TxDataBuilder_1.TxDataBuilder.fromJSON(app.chain.client, account, {
                    tx: json.tx,
                    config: json.config
                });
                await builder.setNonce();
                await builder.setGas();
                let tx = builder.getTxData();
                let sig = await _sign_1.$sign.signTx(app.chain.client, tx, account);
                json.signature = sig;
                json.tx = builder.toJSON().tx;
                let output = params.output ?? path;
                await atma_io_1.File.writeAsync(output, json);
            }
        },
        {
            command: 'send',
            description: [
                'Sends transaction from JSON'
            ],
            arguments: [
                {
                    description: `Path to a Tx JSON file`,
                    required: true
                }
            ],
            params: {
                ...Paramsters_1.Parameters.account({ required: false }),
            },
            async process(args, params, app) {
                let [path] = args;
                let client = app.chain.client;
                _require_1.$require.True(await atma_io_1.File.existsAsync(path), `File bold<${path}> does not exist`);
                let json = await atma_io_1.File.readAsync(path);
                let account = params.account
                    ? await app.getAccount(params.account)
                    : null;
                if (account == null && json.signature) {
                    let address = await _sign_1.$sign.recoverTx(client, json.tx, json.signature);
                    account = { address };
                }
                _require_1.$require.notNull(account, `Account not resolved from CLI, neither valid signature  in tx json exists`);
                let builder = TxDataBuilder_1.TxDataBuilder.fromJSON(client, account, {
                    tx: json.tx,
                    config: json.config
                });
                let writer = TxWriter_1.TxWriter.create(client, builder, account);
                if (json.signature) {
                    _console_1.$console.toast(`Sending transaction with predefined signature`);
                    writer.send({ signature: json.signature });
                }
                else {
                    _console_1.$console.toast(`Sending transaction`);
                    writer.send();
                }
                let hash = await writer.onSent;
                let receipt = await writer.onCompleted;
                await _tx_1.$tx.log(app.chain.client, app.chain.explorer, hash, null, receipt);
            }
        },
        {
            command: 'view',
            description: [
                'Load transaction by hash'
            ],
            arguments: [
                {
                    description: `Tx hash`,
                    required: true,
                }
            ],
            params: {
                ...Paramsters_1.Parameters.chain
            },
            async process(args, params, app) {
                let [hash] = args;
                await _tx_1.$tx.log(app.chain.client, app.chain.explorer, hash);
            }
        }
    ],
    async process() {
        throw new Error(`Subcommand is not set`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CTx === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CTx) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CTx, module.exports);
    } else {
        _src_commands_list_CTx = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_commands_list_CInfo;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_commands_list_CInfo != null ? _src_commands_list_CInfo : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CInfo = void 0;
const _console_1 = _src_utils__console;
const Paramsters_1 = _src_utils_Paramsters;
exports.CInfo = {
    command: 'info',
    description: [
        'Show various information'
    ],
    subcommands: [
        {
            command: 'network',
            description: [
                'Show Network info'
            ],
            params: {
                ...Paramsters_1.Parameters.chain
            },
            async process(args, params, app) {
                let client = app.chain.client;
                let info = await client.getNodeInfos();
                _console_1.$console.table([
                    [
                        'URL',
                        'Current Block',
                        'Status',
                        'Syncing',
                        'Ping',
                        'Peers'
                    ],
                    ...info.map(info => {
                        return [
                            info.url,
                            info.blockNumber,
                            info.status,
                            JSON.stringify(info.syncing),
                            info.pingMs,
                            info.peers,
                        ];
                    })
                ]);
            }
        }
    ],
    async process() {
        throw new Error(`Subcommand is not set`);
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_commands_list_CInfo === module.exports) {
        // do nothing if
    } else if (__isObj(_src_commands_list_CInfo) && __isObj(module.exports)) {
        Object.assign(_src_commands_list_CInfo, module.exports);
    } else {
        _src_commands_list_CInfo = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_app_App;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_app_App != null ? _src_app_App : {};
    var module = { exports: exports };

    "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const a_di_1 = __importDefault(_node_modules_a_di_lib_di);
const Config_1 = _dequanto_src_Config;
const CommandsHandler_1 = _src_commands_CommandsHandler;
const CVersion_1 = _src_commands_list_CVersion;
const CInstall_1 = _src_commands_list_CInstall;
const CConfig_1 = _src_commands_list_CConfig;
const CHelp_1 = _src_commands_list_CHelp;
const CAccounts_1 = _src_commands_list_CAccounts;
const _cli_1 = _src_utils__cli;
const CBlock_1 = _src_commands_list_CBlock;
const PlatformFactory_1 = _dequanto_src_chains_PlatformFactory;
const CAccount_1 = _src_commands_list_CAccount;
const _console_1 = _src_utils__console;
const CReset_1 = _src_commands_list_CReset;
const CContract_1 = _src_commands_list_CContract;
const CInit_1 = _src_commands_list_CInit;
const CToken_1 = _src_commands_list_CToken;
const CGas_1 = _src_commands_list_CGas;
const CSafe_1 = _src_commands_list_CSafe;
const CTransfer_1 = _src_commands_list_CTransfer;
const _color_1 = _dequanto_src_utils__color;
const CTokens_1 = _src_commands_list_CTokens;
const CTx_1 = _src_commands_list_CTx;
const CInfo_1 = _src_commands_list_CInfo;
class App {
    constructor() {
        this.commands = new CommandsHandler_1.CommandsHandler();
        global.app = this;
        this
            .commands
            .register(CInstall_1.CInstall)
            .register(CInit_1.CInit)
            .register(CContract_1.CContract)
            .register(CAccounts_1.CAccounts)
            .register(CAccount_1.CAccount)
            .register(CSafe_1.CSafe)
            .register(CToken_1.CToken)
            .register(CTokens_1.CTokens)
            .register(CTransfer_1.CTransfer)
            .register(CTx_1.CTx)
            .register(CBlock_1.CBlock)
            .register(CGas_1.CGas)
            .register(CConfig_1.CConfig)
            .register(CVersion_1.CVersion)
            .register(CReset_1.CReset)
            .register(CInfo_1.CInfo)
            .register(CHelp_1.CHelp);
    }
    async execute(argv) {
        if (argv?.length > 0) {
            _cli_1.$cli.setParams(argv);
        }
        if (_cli_1.$cli.getParamValue('--color') === 'none') {
            (0, _color_1.$color_options)({ type: 'none' });
        }
        let { params: cliParams, args: cliArgs } = _cli_1.$cli.parse(argv);
        let { command, params, args, paramsDefinition } = await this.commands.findCommand(cliArgs, cliParams);
        if ('help' in cliParams) {
            await CHelp_1.CHelp.printCommand(command, paramsDefinition);
            return null;
        }
        _console_1.$console.toast('Loading config');
        this.config = await Config_1.Config.fetch(params);
        let platform = _cli_1.$cli.getParamValue('-c, --chain', params);
        if (platform) {
            let opts = {};
            let endpoint = _cli_1.$cli.getParamValue('--endpoint', params);
            if (endpoint) {
                opts.endpoints = [{ url: endpoint }];
            }
            this.chain = await a_di_1.default
                .resolve(PlatformFactory_1.PlatformFactory)
                .get(platform, opts);
        }
        // let name = args[0];
        // if (name) {
        _console_1.$console.toast(`Process command gray<${command.command}>`);
        //}
        return await command.process(args, params, this);
    }
    async runFromCli() {
        try {
            await this.execute();
            process.exit(0);
        }
        catch (error) {
            _console_1.$console.log(`red<${error.message}>`);
            let stack = error.stack.split('\n').slice(1).join('\n');
            _console_1.$console.log(`gray<${stack}>`);
            process.exit(1);
        }
    }
    async getAccount(mix) {
        //let accounts = di.resolve(AccountsService, app.config);
        let account = await this.chain.accounts.get(mix);
        return account;
    }
}
exports.App = App;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_app_App === module.exports) {
        // do nothing if
    } else if (__isObj(_src_app_App) && __isObj(module.exports)) {
        Object.assign(_src_app_App, module.exports);
    } else {
        _src_app_App = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
const App_1 = _src_app_App;
const app = new App_1.App();
module.exports = app;


}());
// end:source ./RootModule.js

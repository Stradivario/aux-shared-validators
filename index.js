'use strict';

(function(isNode, isAngular) {

	// Angular format function(value, scope, element, attrs, param)
	// Node format function(value)



	var validatorGenerators = {

		// -------- Value only ---------------------

		contextGt: function(param){
			return function(value){
				// console.log('this: ' + this.a);
				if(value && this[param] && value<=this[param]) throw 'contextGt';
			}
		},

		gt: function(param){
			return function(value){
				if(value<=param) throw 'gt';
			}
		},

		len: function(options){
			return function(value){
				if(options.min && value.length < options.min){
					throw 'len'
				}
				if(options.max && value.length > options.max){
					throw 'max'
				}
			}
		},
		test: function(options){
			return function(){
				throw options.name + 'Tachev'
			}
		}
	};

	// for(let validatorName in validators){
	//     let angularValildator = function(value, scope, element, attrs, para){
	//         validators[validatorName].call(scope, value, param)
	//     }
	//     console.log(validator);
	// }

	var validators = {
		password: validatorGenerators.len({min: 3, max: 10}),
		test: validatorGenerators.test,
		gt: gt,
		contextGt: contextGt
	};


	if (isAngular) {
		angular.module('sharedValidators', []). value('sharedValidators', [validators]);
	}

	if (isNode) {
		module.exports = {
			validators: validators,
			validatorGenerators: validatorGenerators
		};
	}

})(typeof module !== 'undefined' && module.exports,  typeof angular !== 'undefined');


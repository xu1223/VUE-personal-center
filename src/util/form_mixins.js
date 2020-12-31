export default {
    data() {
        return {}
    },
    methods: {
        checkUserName(rule, value, callback) {
            if (value.length > 4) {
                var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                if (value != "" && !myreg.test(value)) {
                    callback(new Error("手机号码格式错误"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        },
        validateCode(rule, value, callback) {
            if (this.code !== value) {
                callback(new Error("验证码不正确!"));
            } else {
                callback();
            }
        },
        validatePhone(rule, value, callback) {
            if (!/^[0-9()（）+-]+$/.test(value)) {
                callback(new Error("Not in line with mobile phone number format"));
            } else {
                callback();
            }
        },
        validateCheckPass(rule, value, callback) {
            if (value !== this.formRegister.password) {
                callback(new Error("The inconsistency of two password inputs!"));
            } else {
                callback();
            }
        },
        validateCheckPass2(rule, value, callback) {
            if (value !== this.formPassword.new_password) {
                callback(new Error("The inconsistency of two password inputs!"));
            } else {
                callback();
            }
        },
        validatePostcode(rule, value, callback) {
            if (!/^[A-Za-z0-9]+$/.test(value)) {
                callback(new Error("Please enter combination of letters or numbers"));
            } else {
                callback();
            }
        },
        initConfig() {
            return {
                title: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                content: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                firstname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                lastname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                email: [{
                        required: true,
                        message: 'Required field',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: 'Please enter the correct email address',
                        trigger: 'change'
                    }
                ],
                mobile: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validatePhone,
                    trigger: 'change'
                }, {
                    min: 11,
                    max: 16,
                    message: "Length needs to be greater than 11 and less than 16",
                    trigger: 'change'
                }],
                password: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    min: 6,
                    message: "Password must not be less than 6 bits",
                    trigger: 'change'
                }],
                checkPass: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validateCheckPass,
                    trigger: 'change'
                }],
                old_password: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                new_password: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    min: 6,
                    message: "Password must not be less than 6 bits'",
                    trigger: 'change'
                }],
                confirm_password: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validateCheckPass2,
                    trigger: 'change'
                }],
            }
        },
        getRulesByConfig(config = []) {
            const configAll = this.initConfig()
            const rules = {}
            config.map(item => {
                rules[item] = configAll[item]
            })
            return rules
        },
        getRulesLogin() {
            return {
                email: [{
                        required: true,
                        message: 'Required field',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: 'Please enter the correct email address',
                        trigger: 'change'
                    }
                ],
                password: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
            }
        },
        getRulesRegister() {
            return {
                email: [{
                        required: true,
                        message: 'Required field',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: 'Please enter the correct email address',
                        trigger: 'change'
                    }
                ],
                password: [{
                    required: true,
                    message: 'Required field',
                    trigger: 'change'
                }],
                password2: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validateCheckPass,
                    trigger: 'change'
                }]
            }
        },
        getRulesAddress() {
            return {
                firstname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                lastname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                address_1: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                country_id: [{
                    required: true,
                    message: "Required field"
                }],
                zone_id: [{
                    required: true,
                    message: "Required field"
                }],
                postcode: [{
                        required: true,
                        message: "Required field",
                        trigger: 'change'
                    },
                    {
                        validator: this.validatePostcode,
                        trigger: 'change'
                    }, {
                        max: 10,
                        message: "Input field length cannot be greater than 10",
                        trigger: 'change'
                    }
                ],
                mobile: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validatePhone,
                    trigger: 'change'
                }, {
                    min: 11,
                    max: 16,
                    message: "Length needs to be greater than 11 and less than 16",
                    trigger: 'change'
                }],
            }
        },
        getRulesOrderAddress() {
            return {
                shipment_firstname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                shipment_lastname: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                shipment_mobile: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }, {
                    validator: this.validatePhone,
                    trigger: 'change'
                }, {
                    min: 11,
                    max: 16,
                    message: "Length needs to be greater than 11 and less than 16",
                    trigger: 'change'
                }],
                shipment_address_1: [{
                    required: true,
                    message: "Required field",
                    trigger: 'change'
                }],
                shipment_country_id: [{
                    required: true,
                    message: "Required field"
                }],
                shipment_zone_id: [{
                    required: true,
                    message: "Required field"
                }],
                shipment_postcode: [{
                        required: true,
                        message: "Required field",
                        trigger: 'change'
                    },
                    {
                        validator: this.validatePostcode,
                        trigger: 'change'
                    }, {
                        max: 10,
                        message: "Input field length cannot be greater than 10",
                        trigger: 'change'
                    }
                ]
            }
        },
    }
}
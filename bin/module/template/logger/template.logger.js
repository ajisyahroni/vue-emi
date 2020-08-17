import Vue from 'vue';

export default {
    install(Vue, options) {

        const Clg = {
            log(...ctx) { console.log(...ctx); return this },
            error(...ctx) { console.error(...ctx); return this },
            info(...ctx) { console.info(...ctx); return this },
            warn(...ctx) { console.warn(...ctx); return this },
            table(...ctx) { console.table(...ctx); return this },
            finish(color) { console.log(`%c-------------------`, `color:${color}`) }
        }

        function style(bgTitleColor, color = 'white') {
            return [
                'font-weight: bold',
                'border-radius:5%',
                'font-family: arial',

                `background:${bgTitleColor}`,
                `color:${color}`
            ].join(';')
        }
        function berforeMount() {
            console.log('before mounted')
        }

        const Logger = function (clg = Clg) {
            return {
                // error
                error(...args) {
                    let errorColor = '#E57373'
                    clg
                        .log(`%c Error 😱 : `, style(errorColor))
                        .error('\t', ...args)
                        .finish(errorColor);
                },

                // success
                success(...args) {
                    let successColor = '#81C784';
                    clg
                        .log(`%c success 😁 : `, style(successColor))
                        .log('\t', ...args)
                        .finish(successColor)
                },

                // info
                info(...args) {
                    let infoColor = '#4DD0E1';
                    clg
                        .log(`%c info 🧐 : `, style(infoColor, 'black'))
                        .info('\t', ...args)
                        .finish(infoColor)
                },

                // warn
                warn(...args) {
                    let warnColor = '#FFF176';
                    clg
                        .log(`%c warn 🤔 : `, style(warnColor, 'black'))
                        .warn('\t', ...args)
                        .finish(warnColor)
                },

                // table
                table(arrayOfObject) {
                    if (typeof arrayOfObject == "object") {
                        let tableColor = '#90A4AE';
                        clg
                            .log(`%c table 😍 : `, style(tableColor, 'black'))
                            .table(arrayOfObject)
                            .finish(tableColor);
                    }
                    else {
                        this.warn('please insert array of object variable')
                    }
                }
            }
        }


        let logger = new Logger(Clg);
        const { error, info, success, warn, table } = logger

        Vue.prototype.$info = info;
        Vue.prototype.$error = error;
        Vue.prototype.$success = success;
        Vue.prototype.$warn = warn;
        Vue.prototype.$table = table;
        
    }
}



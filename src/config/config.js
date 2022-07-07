module.exports = {
    //  changeHook: async function (item) 
    //     {
    //         console.log('changeHook  base triggered - global override');
    //         console.log(item);
    //         return true
    //     },
    pipeline: [
        {
            name: "log",
            config:
            {
                "myvar": "myname"
            }

        },
        {
            name: "http",
            config:
            {
                "endpoint": "http://localhost:3000"
            }

        },
        {
            name: "dummy",
            config:
            {

            }
        },

    ],
    plugins:
    {
        "dummy": async function (input, config, context) {
            console.log("NOTHING");
            return input;
        },

    },
    databases:
    {


        "avinor":
        {
            // changeHook: async function (item) 
            // {
            //     console.log('changeHook  base triggered - databaselevel override');
            //     console.log(item);
            //     return true
            // },
            collections:
            {
                flights:
                {
                    changeHook: async function (item) {
                        console.log('changeHook  base triggered - collection override');
                        console.log(item);
                        return true
                    },
                }

            }
        },
    }
};

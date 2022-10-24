import {defineStore} from 'pinia';

export const useFeedStore = defineStore({
    id: 'feedStore',

    state:()=>{
        return{
            //informacion de los rss
            source:[
                {
                    id: crypto.randomUUID(),
                    name: 'mozilla hacks',
                    url: 'https://hacks.mozilla.org/feed',
                }
            ],

            //relacion al feed actual
            current:{
                source: null,
                items: null,
            }
        }
    }
})

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
            },
        };
    },

    // actions
    actions:{
        async loadSource(source){
            const response = await fetch(source.url);
            let text = await response.text();
            text = text.replace(/content:encoded/g, 'content');
            const domParser = new DOMParser();
            let doc = domParser.parseFromString(text, "text/xml");

            console.log(doc);
            const posts = [];
            doc.querySelectorAll('item, entry').forEach(item =>{
                const post = {
                    title: item.querySelector("title").textContent ?? "sin titulo",
                    content: item.querySelector("content").textContent ?? "",
                };
                posts.push(post);
            });
            this.current.items = [...posts];
            this.current.source = source;
        },
        async registerNewSource(url){

            try {
                const response = await fetch(url);
                let text = await response.text();
                const domParser = new DOMParser();
                let doc = domParser.parseFromString(text, "text/xml");

                const title = doc.querySelector("channel title, feed title");

                const source = {
                    id: crypto.randomUUID(),
                    name: title.textContent(),
                    url,
                };
                this.source.push(source)
            } catch (error) {
                console.log(error);
            }
        }
    }
});

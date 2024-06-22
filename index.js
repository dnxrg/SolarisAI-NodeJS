import axios from "axios"

export default class SolarisAI {
    /**
     * Create a new SolarisAI Instance
     * 
     * @param {string} api_key The api key that was provided
     */
    constructor(api_key) {
        this.apiKey = api_key
        if (apiKey == undefined || apiKey == null || apiKey == "" || typeof apiKey !== "string") this.apiKey = "";
    }


    /**
        * The Question You Want to Ask Artificial Intelligence.
        * @param {string} model "v3" (GPT-4)
        * @param {string} model "v3-32k" (GPT-4-32k)
        * @param {string} model "turbo" (GPT-3.5 Turbo)
        * @param {string} model "turbo-16k" (GPT-3.5 Turbo-16k)
        * @param {string} model "gemini" (Google Gemini-Pro)
        * @param {string} content The Question You Want to Ask Artificial Intelligence.
        * @param {string} personality It includes the features that you want to be included in the output you want from artificial intelligence.
        * @example client.question({model:"v3-beta",content:"how are you?"})
        * @type {string} The Question You Want to Ask Artificial Intelligence.
        * @async
    */
    async question({ model = "v3", content, personality = "" }) {
        if (!["v3", "gemini", "v3-32k", "turbo", "turbo-16k"].some(ind => model == ind)) model = "v3";
        if (!content || content == undefined || content == null) throw new Error("Please specify a question!");
        try {
            var api = await axios.get(`https://ai.dnxrg.com/api/question?model=${model}&question=${encodeURI(content)}`, {
                headers: {
                    "content-type": "application/json",
                    "Authorization": this.apiKey,
                },
                data: {
                    personality: personality
                }
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }

    /**
        * Tell Artificial Intelligence What You Want to Draw.
        * @param {string} model "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia", "simurg", "animefy", "raava", "shonin"
        * @param {string} prompt Tell Artificial Intelligence What You Want to Draw.
        * @param {string} negative_prompt It includes the features that you do not want to be included in the output you want from artificial intelligence.
        * @example client.drawImage({model:"v3",prompt:"anime girl"})
        * @type {string} Tell Artificial Intelligence What You Want to Draw
        * @async
        */
    async drawImage({ model = "v3", prompt, negative_prompt = "" }) {
        if (!["v1", "v2", "v2-beta", "v3", "lexica", "prodia", "simurg", "animefy", "raava", "shonin"].some(ind => model == ind)) model = "prodia";
        if (!prompt || prompt == undefined || prompt == null) throw new Error("Please specify a prompt!");
        try {
            var api = await axios.get(`https://ai.dnxrg.com/api/text2image?prompt=${encodeURI(prompt)}&model=${model}&negative_prompt=${encodeURI(negative_prompt)}`, {
                headers: {
                    "content-type": "application/json",
                    "Authorization": this.apiKey,
                },
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }

}
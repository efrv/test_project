import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

Vue.component('loader',{
    template:`    
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`
})

new Vue({
    el:'#app',
    data(){
        return {
            loading: false,
            currId: '',
            form:{
                name: '',
                code: ''
            },
            items: []
        }
    },
    computed:{
        isCorrect(){
            return  this.form.name.trim() && this.form.code.trim()
        }
    }
    ,
    methods:{
        async createItem(){
            let {...item} = this.form
            let result = await request('/api/counterparts', 'POST', {counterparts:[item]})
            if(result.error) alert(result.error.message)
            else this.clearForm()
            await this.updateList()
        },
        async updateItem(){
            let {...item} = this.form
            item.id = this.currId
            //this.items.push({...item, id:Date.now(), marked:false})
            let result = await request('/api/counterparts', 'PATCH', {counterparts:[item]})
            if(result.error) alert(result.error.message)
            else this.clearForm()
            await this.updateList()
        },
         async removeItem(id){
            const result = await request(`/api/counterparts/`, 'DELETE', {id})
            if(result.error) alert(result.error.message)
            await this.updateList()
        },
        modItem(id){
            this.currId = id
            const item = this.items.find(i => i.id = id)
            this.form.name = item.name
            this.form.code = item.code
        },
        modCancel(){
            this.clearForm()
        },
        async updateList()
        {
            this.loading = true
            this.items = await request('/api/counterparts')
            this.loading = false
        },
        clearForm(){
            this.form.name = this.form.code = this.currId = ''
        }

    },
    async mounted()
    {
        await this.updateList()
    }


})

async function request(url, method = 'GET', data = null){
    try {
        const headers = {}
        let body
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url,
            {
                method,
                headers,
                body,
            })
        const result = await response.json()
        return result


    } catch (e) {
        console.warn('Error:', e)
    }
}

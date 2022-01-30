function fortniteShop(value) {
    $.post('/api/dashboard/fnshop', value, function(data) {
        console.log(`[DASH] ${data} trocado com sucesso.`)
    })
}
function logsChannel(value) {
    $.post('/api/dashboard/fnshop', value, function(data) {
        console.log(`[DASH] ${data} trocado com sucesso.`)
    })
}
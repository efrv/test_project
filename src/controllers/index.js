exports.index = (req, res) => {
    res.sendFile('index.html', {root: 'src/views'})
}
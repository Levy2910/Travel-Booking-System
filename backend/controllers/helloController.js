// Only for testing
const express = require('express')

const helloWorld = (req, res) => {
    res.send('Hello wds');

}

module.exports = { helloWorld }
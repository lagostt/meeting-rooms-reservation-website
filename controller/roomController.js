const roomSchema = require('../models/Room')

exports.addRoom = async (req, res) => {
    const { label, address, capacity, mic, vid, bigscreen, vidconf, table, chair } = req.body 
    try{
        await roomSchema.create({
             label, address, capacity, 
             image: req.file.filename,
             equipments: {
                microphone: parseInt(mic),
                projecter: parseInt(vid),
                screen: parseInt(vidconf),
                bigscreen: parseInt(bigscreen),
                tables: parseInt(table),
                chairs: parseInt(chair)
             },
            })
        res.json({redirectTo:'/consult-rooms'})

    }catch(e){
        console.log(e)  
        res.send('failed to add room')
    }
}

exports.updateRoom = async (req, res) => {
    const { oldImage, label, address, capacity, mic, vid, bigscreen, vidconf, table, chair } = req.body 
    console.log(req)
    try{
        await roomSchema.findByIdAndUpdate(req.params.id,{
             label, address, capacity, 
             image: req.file ? req.file.filename : oldImage,
             equipments: {
                microphone: parseInt(mic),
                projecter: parseInt(vid),
                screen: parseInt(vidconf),
                bigscreen: parseInt(bigscreen),
                tables: parseInt(table),
                chairs: parseInt(chair)
             },
            })
        res.json({redirectTo:'/consult-rooms'})

    }catch(e){
        console.log(e)  
        res.send('failed to add room')
    }
}

exports.consult = async (req, res, next) => {
    try {
        const data = await roomSchema.find()
        console.log(data)
        req.data = data
        next()
    }catch(e){
        console.log(e)
        res.send('failed to retrieve data')
    }
}

exports.findRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const room = await roomSchema.findById(id)
        req.room = room
        next()
    } catch(e) {
        res.send('failed to find room')
    }
}
    exports.deleteRoom = async (req, res) => {
        try {
            const { id } = req.params
            await roomSchema.findByIdAndDelete(id)
            res.json({redirectTo:'/consult-rooms'})
        } catch(e) {
            res.send('failed to find room')
        }
}
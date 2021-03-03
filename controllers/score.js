const Score = require('../models/Score')
const errorHandler = require('../utils/errorHandler')

module.exports.scoreUpdate = async function (req, res) {

    const Scorebd = await Score.findOne({
        user: req.user.id
    })

    if (!Scorebd) {
        const score = new Score({
            user: req.user.id,
            begginer: [],
            medium: [],
            expert: []
        })
        console.log('new created')
        try {
            //добавили пустой скор
            //надо добавить элементы в массив

            switch (req.body.lastGame.dificulty) {
                case 1: score.begginer[0] = req.body.lastGame
                    break
                case 2: score.medium[0] = req.body.lastGame
                    break
                case 3: score.expert[0] = req.body.lastGame
                    break
                default: break
            }

            await score.save()
            res.status(200).json({ score })
        } catch (e) {
            //ошибка
            errorHandler(res, e)
        }

    } else {
        let newArray = []
        try {

            switch (req.body.lastGame.dificulty) {
                case 1: newArray = Scorebd.begginer
                    break
                case 2: newArray = Scorebd.medium
                    break
                case 3: newArray = Scorebd.expert
                    break
                default: break
            }

            newArray.push(req.body.lastGame)
            newArray.sort((a, b) => b.time < a.time ? 1 : -1)

            if (newArray.length > 10)
                newArray.pop()

            switch (req.body.lastGame.dificulty) {
                case 1: const updatedScore = await Score.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: { begginer: newArray } },
                    { new: true }
                )
                    res.status(200).json({ updatedScore })
                    break
                case 2: const updatedScore = await Score.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: { medium: newArray } },
                    { new: true }
                )
                    res.status(200).json({ updatedScore })
                    break
                case 3: const updatedScore = await Score.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: { expert: newArray } },
                    { new: true }
                )
                    res.status(200).json({ updatedScore })
                    break
                default: break
            }

        } catch (e) {
            //ошибка
            errorHandler(res, e)
        }
    }

}


module.exports.scoreGet = async function (req, res) {

    const scores = await Score.findOne({
        user: req.user.id
    })

    if (scores) {
        res.status(200).json({
            begginer: scores.begginer,
            medium: scores.medium,
            expert: scores.expert
        })
    } else {
        res.status(404).json({ message: "Dont found" })
    }
}
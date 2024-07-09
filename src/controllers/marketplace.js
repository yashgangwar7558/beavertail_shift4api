require('dotenv').config()

exports.receivedInstallationRequest = async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).send('Request received and validated')
    } catch (err) {
        console.error('Error getting installation request:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}
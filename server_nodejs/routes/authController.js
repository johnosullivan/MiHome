var authController = {};

authController.ping = async (req, res) => { 
    console.log('Ping MiHome');
    res.json({ });
};

module.exports = authController;
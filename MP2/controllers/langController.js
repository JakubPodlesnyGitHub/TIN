exports.changeLang = (req, res, next) => {
    const newLang = req.params.lang;

    if(['pl','en','de'].includes(newLang)) {
        res.cookie('CineGO', newLang);
    };
    res.redirect(req.get('referer'));
}
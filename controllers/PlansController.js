const PlansService = require("../services/PlansService");
const Crypter = require("../services/Crypters");
class PlansController {

    async index(req, res) {

        var plans = await PlansService.list();
        res.render("plans/index", {plans: plans, crypter: Crypter});

    }

    create(req, res) {
        res.render("plans/create", { title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg') });
    }

    async store(req, res) {
        var { title, list, client, value, imports } = req.body;
        var plan = { title, list, client, value, import: imports }
        var result = await PlansService.store(plan);

        if (result == true) {
            res.redirect("/plans");
        } else {
            req.flash('title_msg', result.title_msg);
            req.flash("list_msg", result.list_msg);
            res.redirect("/admin/plans/create");
        }
    }

    async edit(req, res){
        var id = req.params.id;
        console.log(Crypter.enconde64(id))
        var plan = await PlansService.getById(id);
        res.redirect("/admin/plans/edit", {plan, title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg')});
    }

    editFull(req, res){
        res.render("plans/edit", {plan, title_msg: req.flash('title_msg'), list_msg: req.flash('list_msg')});
    }   

    async update(req, res){
        var { id, title, list, client, value, imports } = req.body;
        var plan = { title, list, client, value, import: imports }
        var result = await PlansService.update(id, plan);

        if (result == true) {
            res.redirect("/admin/plans/edit/" + id);
        } else {
            req.flash('title_msg', result.title_msg);
            req.flash("list_msg", result.list_msg);
            res.redirect("/admin/plans/edit/" + id);
        }
    }

    async disable(req, res){
        var id = req.params.id;
        await PlansService.disable(id);
        res.redirect("/plans");
    }

    async enable(req, res){
        var id = req.params.id;
        await PlansService.enable(id);
        res.redirect("/plans");
    }
}

module.exports = new PlansController();
module.exports = class userDto {
    id;
    username;
    activated;
    roles;
    constructor(model) {
        this.username = model.username;
        this.id = model._id;
        this.activated = model.activated;
        this.roles = model.roles;
    }
}
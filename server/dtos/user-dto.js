module.exports = class userDto {
    id;
    username;
    activated;
    constructor(model) {
        this.username = model.username;
        this.id = model._id;
        this.activated = model.activated
    }
}
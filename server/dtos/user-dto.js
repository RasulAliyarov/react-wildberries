module.exports = class userDto {
    id;
    username;
    isActivated;
    constructor(model) {
        this.username = model.username;
        this.id = model._id;
        this.isActivated = this.isActivated
    }
}
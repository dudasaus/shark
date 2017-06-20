class Tab {
    constructor() {
        this.node = document.createElement("span");
        this.node.classList.add("tab", "unsaved", "active");
        this.mode = "welcome";
        this.name = "New tab";
        this.content = "";
        this.saved = false;
        this.setName("New tab");
    }

    setName(name) {
        this.name = name;
        this.node.innerHTML = name;
    }
}

module.exports = Tab;

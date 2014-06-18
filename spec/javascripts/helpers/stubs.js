var stubMonster = function(name) {
  return Monster = function() {
    this.name = name;
  }
}
class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
    // this.ancestors = [];
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while(currentVampire.creator){
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(!this.creator){
      return true;
    }
    if(!vampire.creator){
      return false;
    }
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  listAncestors(){
    let ancestors = [];
    let currentVampire = this;
    while(currentVampire.creator){
      ancestors.push(currentVampire.creator)
      currentVampire = currentVampire.creator;
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    //if vampire is the parent of this OR vampire is the root
    if(this.creator === vampire || !vampire.creator){
      return vampire;
    }
    //if this is the parent of vampire OR this is the root OR this is the vampire
    if(vampire.creator === this || !this.creator || this === vampire){
      return this;
    }
    for (let a of this.listAncestors()){
      for (let v of vampire.listAncestors()){
        if(a === v){
          return a;
        }
      }
    }
  }
}

module.exports = Vampire;


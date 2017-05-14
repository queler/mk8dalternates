/* sort.js
  Provides functions used to sort part lists.
  
  sortAll - the only function that should need to be called manually. Handles all sort functions based on the user's settings.
  byDefault - sort by default ordering, as displayed in-game
  byName - sort part lists by name of the part
  
  */
  
var sort = {
  statToSort:0,
  currentSort:"chara",
  statSet:[0,0,0,0,0,0,0,0,0,0,0,0],

  sortResults:function(a,b){
    var totalA = 0;
    var totalB = 0;
    for(var i=0;i<12;i++){
      totalA += stats.chara[a[0]][i]+stats.kart[a[1]][i]+stats.tire[a[2]][i]+stats.glider[a[3]][i];
      totalB += stats.chara[b[0]][i]+stats.kart[b[1]][i]+stats.tire[b[2]][i]+stats.glider[b[3]][i];
    }
    if(totalA == totalB) return 0;
    else return(totalA < totalB)?1:-1;
  },

  byDefault(a,b){
    var asc = settings.sortOrder == 0;
    var outA = asc?-1:1;
    var outB = asc?1:-1;
    if(a[0] == b[0]) return 0;
    else return (a[0] < b[0])?outA:outB;
  },

  byName(a,b){
    var asc = 1;
    var outA = asc?-1:1;
    var outB = asc?1:-1;
    var n1 = str.get(sort.currentSort,a[0]);
    var n2 = str.get(sort.currentSort,b[0]);
    if(n1 == n2) return 0;
    else return (n1<n2)?outA:outB;
  },

  byStat(a,b){
    var asc = settings.sortOrder == 0;
    var outA = asc?-1:1;
    var outB = asc?1:-1;
    var statOrder = [0,4,5,6,10,11,2,1,3,8,7,9,12];
    var s1 = stats[sort.currentSort][a[1]][statOrder[sort.statToSort]];
    var s2 = stats[sort.currentSort][b[1]][statOrder[sort.statToSort]];
    if(s1 == s2){
      return(a[0] < b[0])?outA:outB;
    }
    else return (s1<s2)?outA:outB;
  },

  sortAll:function(){
    var sortType = sort.byName;
    for(var i=0;i<ui.lists.length;i++){
      sort.currentSort = ui.lists[i];
      parts[ui.lists[i]].sort(sortType);
    }
  }
};

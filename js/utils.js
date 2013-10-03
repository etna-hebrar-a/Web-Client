function getAddressListTorrent() {
  return {
    method: 'GET',
    url: 'http://eip.pnode.fr:8000/torrents',
  }
}


function abstractionDownloads(data) {
  myTab = new Array();
  var i = 0;
  angular.forEach(data, function(d){
    myTab[i] = new Object();
    myTab[i].id_dl = d.id;
    myTab[i].status = d.status;
    myTab[i].name = d.name;
    myTab[i].size_tot = d.total_size;
    myTab[i].size_dl = d.dl_size;
    myTab[i].speed = d.dl_rate;
    myTab[i].added_date = d.added_date;
    ++i;
  });
  return myTab;
}

function conversOctet(size) {
  if (size < 1024) return size + 'o';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'Ko';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'Mo';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'Go';
  if ((size /= 1024) < 1024) return size.toFixed(2) + 'To';
}

  function getAddressAdmin() {
  return './admin.json';
}

Array.prototype.unset = function(val){
    var index = this.indexOf(val)
    if(index > -1){
        this.splice(index,1)
    }
}

function abstractionAdmin(data) {
  myTab = new Object();
  myTab.ip = data[0].ip;
  myTab.users = data[0].users;
  return myTab;
}
function grapheGenerate() {
  var col= document.getElementById("liste");
  col= col.value.split(",");
  var iden=[];
  for(var i = 0;i<col.length;i++){
    for(var j = 0;j<col.length;j++){
      if(i<j){iden.push(col[i]+"_"+col[j]);}
    }
  }
  //createVilles
  villes=[] 
  for(var i=0; i<col.length;i++){
    villes.push(new Node(col[i]))
  }
  for(var i=0; i<iden.length;i++){
    //if(document.getElementById(iden[i])){
      id=iden[i].split("_")
      var val=document.getElementById(iden[i]).value;
      var index=col.indexOf(id[0]);
      villes[index].addSuccessor(id[1],parseInt(val));
      var index=col.indexOf(id[1]);
      villes[index].addSuccessor(id[0],parseInt(val))
    //}
    /*else {
      var val=document.getElementById(iden[i].split('').reverse().join('')).value;
      var index=col.indexOf(iden[i][1]);
      villes[index].addSuccessor(iden[i][0],parseInt(val))
    }*/
  }
  var villesGraphe=new Graphe(noeuds=villes)
    var nodes = new vis.DataSet(villesGraphe.nodesToText());
    GrapheVilles=villesGraphe;

      // create an array with edges
      var edges = new vis.DataSet(villesGraphe.edgesToText());
      console.log(edges);
      // create a network
      var container = document.getElementById("mynetwork");
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
  edges:{
    
    label: "",
  }
}
     
      var network = new vis.Network(container, data, options);
}
function SolutionPVC(){
  Debut = new Date();

   var sol=sol_PVC(GrapheVilles,0);

   Fin = new Date();
   var temp=document.getElementById("timeExacte");
   temp.innerHTML="temps d'execution: "+String(Fin-Debut)+ " ms "
  var temp=document.getElementById("CoutExacte");
   temp.innerHTML="Le cout est "+sol[1];
  
  var cities=[];
  for(var i =0;i<sol[0].length;i++){
    var cite=GrapheVilles.noeuds[sol[0][i]];
    cities[i]=new Node(cite.info);
    j=i+1;
    if (j===sol[0].length) j=0;
    var succ=cite.successors.get(GrapheVilles.noeuds[sol[0][j]].info);
    cities[i].addSuccessor(GrapheVilles.noeuds[sol[0][j]].info,succ);
  }

  var g=new Graphe(cities);
  var nodes = new vis.DataSet(g.nodesToText());
    

      // create an array with edges
      var edges = new vis.DataSet(g.edgesToText());
      
      // create a network
      var container = document.getElementById("mynetworkSol");
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
  edges:{
    
    label: "",
  }
}
     
      var network = new vis.Network(container, data, options);

}
function solutionHeuristique(){
  Debut = new Date();

   var g=GrapheVilles.PVC_heuristique();
   Fin = new Date();
   var temp=document.getElementById("timeHeuristique");
   temp.innerHTML="temps d'execution: "+String(Fin-Debut)+ " ms ";
   var taille= function long(){
    var edges=g.edgesToText();
    var sum=0
    for(edge of edges){
      sum+=parseInt(edge.label);
    }
    return sum;
   }
    var temp=document.getElementById("CoutHeur");
   temp.innerHTML="Le cout est "+String(taille());
  var nodes = new vis.DataSet(g.nodesToText());
    

      // create an array with edges
      var edges = new vis.DataSet(g.edgesToText());
      
      // create a network
      var container = document.getElementById("mynetworkSolHeur");
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
  edges:{
    
    label: "",
  }
}
     
      var network = new vis.Network(container, data, options);
}
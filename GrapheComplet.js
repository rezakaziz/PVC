class Node{
	constructor(info,successors=new Map()){
		this.info=info;
		this.successors=successors;
	}
	/**
	successors est une map(nom ville:distance)
	**/
	
	addSuccessor(noeud,distance){
		this.successors.set(noeud,distance);
	}
	Todict(i){
		return { id: i, label: this.info };
	}

	edgeTodict(noeuds){
		let res=[];
		let indice=noeuds.findNoeudByValue(this.info);
		for(let n of this.successors){
			let ind=noeuds.findNoeudByValue(n[0]);
			res.push({from: indice, to: ind, label: String(n[1])});
		}

		return res;
	}
	degres(){
		return this.successors.size;
	}
}


class Graphe{
	constructor(noeuds=[],visited=[]){
		this.noeuds=noeuds;
		this.visited=visited;
		for(let i in noeuds){
			this.visited.push(false);
		}
		this.arrete=this.edgesToText();
	}

	addNode(node){
		this.noeuds.push(node);
		this.visited.push(false);
	}

	setVisited(i){
		this.visited[i]=true;
	}
	setUnVisited(i){
		this.visited[i]=false;
	}
	findNoeudByValue(value){
		return this.noeuds.indexOf(this.noeuds.find(e => e.info==value));
	}
	resetVisited(){
		for (let v in this.visited){
			
			this.visited[v]=false;
		}
	}
	nodesToText(){
		let res=[]
		for(let n in this.noeuds){
			
			res.push(this.noeuds[n].Todict(n));
		}
		return res;
		
	}
	arcEquals(a1,a2){
		if(a1.from===a2.from && a1.to===a2.to ) return true;
		return false;
	}
	noeudExist(tab,i){
		
		let arc={from: i["to"], to: i['from'], label: i['label']};
		
		for(let a of tab){

			if (this.arcEquals(arc,a)) return true;
		}

		return false;
	}

	edgesToText(){
		let res=[];

		for(let n of this.noeuds){
			let suite=n.edgeTodict(this)
			
			for(let i of suite){
				
				if(!this.noeudExist(res,i)){
					res.push(i);
				}
			}
		}

		return res;
		
	}

	PVC_heuristique(){
		var edges=this.arrete;
		var taille=this.noeuds.length;
		
		edges.sort((a, b) => (parseInt(a.label) > parseInt(b.label)) ? 1 : -1);
		var v=new Graphe();
		for (var n of this.noeuds){
			v.addNode(new Node(n.info));
		}
		var dejaVisite=new Set();
		for(var edge of edges){
			var nS=v.noeuds[v.findNoeudByValue(this.noeuds[edge.from].info)];
			var nD=v.noeuds[v.findNoeudByValue(this.noeuds[edge.to].info)];
			if(nS.degres()<2 && nD.degres()<2){
				if(!(dejaVisite.has(edge.from))){
					dejaVisite.add(edge.from);
					dejaVisite.add(edge.to);
					nS.addSuccessor(nD.info,edge.label);
					nD.addSuccessor(nS.info,edge.label);
				}else if(!(dejaVisite.has(edge.to))){
					dejaVisite.add(edge.to);
					nS.addSuccessor(nD.info,edge.label);
					nD.addSuccessor(nS.info,edge.label);
				} 
				else if (dejaVisite.size===taille){
					nS.addSuccessor(nD.info,edge.label);
					nD.addSuccessor(nS.info,edge.label);
				}
			}
		}

		return v;
	
}

}


function DFS(noeuds,noeud,ordre=[]){
	noeuds.setVisited(noeud);
	ordre.push(noeud);
	let nexts=noeuds.noeuds[noeud].successors;
	
	for(const n of nexts.keys()){
		index=noeuds.findNoeudByValue(n);
		
		if(noeuds.visited[index]==false){
			DFS(noeuds,index,ordre);
		}	
	}
}


function Exacte_PVC(noeuds,noeud){
	noeuds.resetVisited();
	let ordre=[];
	DFS(noeuds,noeud,ordre);
	let noeudI=noeuds.noeuds[ordre[0]]
	let noeudF=noeuds.noeuds[ordre[1]]
	let longeur=0;
	let i =1;
	while(noeudF!=undefined){
		longeur+=noeudI.successors.get(noeudF.info);
		
		noeudI=noeudF;
		noeudF=noeuds.noeuds[ordre[++i]];
	}
	longeur+=noeudI.successors.get(noeuds.noeuds[ordre[0]].info);
	
	return [ordre,longeur];
}

function sol_PVC(noeuds,noeud){
	ordres=[];
	longeurs=[];
	
	for(let i in noeuds.noeuds){
		
		let S=Exacte_PVC(noeuds,parseInt(i));
		
		ordres.push(S[0]);
		longeurs.push(S[1]);
	}
	
	lonmin=Math.min(...longeurs);
	return [ordres[longeurs.indexOf(lonmin)],lonmin];
}


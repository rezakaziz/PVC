class Node{
	constructor(info){
		this.info=info;
		this.successors=new Map();
	}
	/**
	successors est une map(nom ville:distance)
	**/
	constructor(info, successors){
		this.info=info;
		this.successors=successors;
	}
}
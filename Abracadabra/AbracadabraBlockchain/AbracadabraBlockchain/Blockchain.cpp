#include "Blockchain.h"

Blockchain::Blockchain() {
	chain_.emplace_back(Block(0, "Genesis Block"));
	difficulty_ = 3;
}

void Blockchain::addBlock(Block newBlock) {
	newBlock.setPreviousHash(getLastBlock_().getHash());
	newBlock.mineBlock(difficulty_);
	if (isBlockValid_(newBlock) == false)
		cout << "BAD" << endl;
	chain_.push_back(newBlock);
	cout << "Block mined: " << newBlock.getHash() << endl;
}

Block Blockchain::getLastBlock_() const {
	return chain_.back();
}

bool Blockchain::isBlockValid_(Block newBlock) const {
	const Block previousBlock = chain_.at(chain_.size() - 1);
	if (previousBlock.getIndex() + 1 != newBlock.getIndex()) {
		return false;
	}
	else if (newBlock.getPreviousHash() != previousBlock.getHash()) {
		return false;
	}
	else if (newBlock.getHash() != newBlock.calculateHash()) {
		return false;
	}
	return true;
}
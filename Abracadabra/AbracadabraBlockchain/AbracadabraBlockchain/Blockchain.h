#pragma once

#include <cstdint>
#include <vector>
#include "Block.h"

using namespace std;

class Blockchain {
public:
	Blockchain();

	void addBlock(Block newBlock);

private:
	uint32_t difficulty_;
	vector<Block> chain_;

	bool isBlockValid_(Block newBlock) const;
	Block getLastBlock_() const;
};
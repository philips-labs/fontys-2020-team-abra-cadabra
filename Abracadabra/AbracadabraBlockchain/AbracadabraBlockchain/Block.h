#pragma once

#include <cstdint>
#include <iostream>

using namespace std;

class Block {
public:
	Block(uint32_t index, const string& data);
	uint32_t getIndex() const;
	string getHash() const;
	string getPreviousHash() const;
	void setPreviousHash(string previousHash);
	void mineBlock(uint32_t difficulty);
	string calculateHash() const;

private:
	uint32_t index_;
	int64_t nonce_;
	string data_;
	string hash_;
	time_t time_;

	string previousHash_;
	bool previousHashInitialized_ = false;

	string calculateHash_() const;
};

#include <time.h>
#include <sstream>
#include "Block.h"
#include "sha256.h"

Block::Block(uint32_t index, const string& data) : index_(index), data_(data) {
	nonce_ = -1;
	time_ = time(nullptr);
}

string Block::getHash() const {
	return hash_;
}

void Block::mineBlock(uint32_t difficulty_) {
	string challenge(difficulty_, '0');

	do {
		nonce_++;
		hash_ = calculateHash_();
	} while (hash_.substr(0, difficulty_) != challenge);
}

inline string Block::calculateHash_() const {
	stringstream hash;
	hash << index_ << time_ << data_ << nonce_ << previousHash_;

	return sha256(hash.str());
}

string Block::calculateHash() const {
	stringstream hash;
	hash << index_ << time_ << data_ << nonce_ << previousHash_;

	return sha256(hash.str());
}

uint32_t Block::getIndex() const {
	return index_;
}

string Block::getPreviousHash() const {
	return previousHash_;
}

void Block::setPreviousHash(string previousHash) {
	if (previousHashInitialized_ == false) {
		previousHash_ = previousHash;
		previousHashInitialized_ = true;
	}
}
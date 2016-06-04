mongo test --eval "db.dropDatabase()"
mongorestore -d test -c vocabulary dump/test/vocabulary.bson

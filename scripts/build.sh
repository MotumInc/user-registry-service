yarn proto &&
yarn tsc &&
# cp src/protobuf-gen/*.js out/protobuf-gen 
mkdir -p out/protobuf-gen
for file in src/protobuf-gen/*.js
    do cp "$file" out/protobuf-gen/
done
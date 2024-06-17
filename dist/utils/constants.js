"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCKER_STREAM_HEADER_SIZE = exports.submission_queue = exports.CPP_IMAGE = exports.JAVA_IMAGE = exports.PYTHON_IMAGE = void 0;
exports.PYTHON_IMAGE = "python3.8-slim";
exports.JAVA_IMAGE = "openjdk:11-jdk-slim"; // docker pull openjdk:11-jdk-slim
exports.CPP_IMAGE = "gcc:latest"; // docker pull gcc:latest
exports.submission_queue = "SubmissionQueue";
// This will represent the header size of docker stream
// docker stream header will contain data about type of stream i.e. stdout/stderr
// and the length of data
exports.DOCKER_STREAM_HEADER_SIZE = 8; // in bytes

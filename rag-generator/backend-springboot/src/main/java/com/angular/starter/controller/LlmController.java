package com.angular.starter.controller;

import com.angular.starter.mock.llm.ChatGptMock;
import com.angular.starter.mock.llm.ClaudeMock;
import com.angular.starter.service.llm.ChatGptService;
import com.angular.starter.service.llm.ClaudeService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/llm")
public class LlmController {

    @Value("${use.mock:false}")
    private boolean useMock;

    private final ChatGptService chatGptService;
    private final ClaudeService claudeService;
    private final ChatGptMock chatGptMock;
    private final ClaudeMock claudeMock;

    public LlmController(ChatGptService chatGptService, ClaudeService claudeService,
                         ChatGptMock chatGptMock, ClaudeMock claudeMock) {
        this.chatGptService = chatGptService;
        this.claudeService = claudeService;
        this.chatGptMock = chatGptMock;
        this.claudeMock = claudeMock;
    }

    @PostMapping("/{mode}/{model}")
    public Map<String, Object> handleRequest(@PathVariable String mode,
                                             @PathVariable String model,
                                             @RequestBody(required = false) Map<String, Object> input) {
        System.out.println("POST /api/llm/" + mode + "/" + model);
        System.out.println("▶️ useMock = " + useMock);
        System.out.println("▶️ payload = " + input);

        if (input == null || input.isEmpty() || !input.containsKey("name")) {
            return Map.of(
                "success", false,
                "data", "missing question in request body"
            );
        }

        String modelKey = model.toLowerCase();
        String result;

        try {
            switch (modelKey) {
                case "chatgpt":
                    result = useMock ? chatGptMock.reply(mode, input) : chatGptService.reply(mode, input);
                    break;
                case "claude":
                    result = useMock ? claudeMock.reply(mode, input) : claudeService.reply(mode, input);
                    break;
                default:
                    return Map.of(
                        "success", false,
                        "data", "unknown-provider: " + model
                    );
            }

            return Map.of(
                "success", true,
                "mode", mode,
                "model", modelKey,
                "data", result
            );

        } catch (Exception e) {
            System.err.println("❌ Error while handling request: " + e.getMessage());
            return Map.of(
                "success", false,
                "data", "internal-error",
                "error", e.getMessage()
            );
        }
    }
}



//package com.angular.starter.controller;
//
//import com.angular.starter.mock.llm.ChatGptMock;
//import com.angular.starter.mock.llm.ClaudeMock;
//import com.angular.starter.service.llm.ChatGptService;
//import com.angular.starter.service.llm.ClaudeService;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/llm")
//public class LlmController {
//
//    @Value("${use.mock:false}")
//    private boolean useMock;
//    
//    private final ChatGptService chatGptService;
//    private final ClaudeService claudeService;
//    private final ChatGptMock chatGptMock;
//    private final ClaudeMock claudeMock;
//
//    public LlmController(ChatGptService chatGptService, ClaudeService claudeService,
//                         ChatGptMock chatGptMock, ClaudeMock claudeMock) {
//        this.chatGptService = chatGptService;
//        this.claudeService = claudeService;
//        this.chatGptMock = chatGptMock;
//        this.claudeMock = claudeMock;
//    }
//    
//    @PostMapping("/{type}/{llm}")
//    public Map<String, Object> handleRequest(@PathVariable String type,
//                                             @PathVariable String llm,
//                                             @RequestBody(required = false) Map<String, Object> input) {
//        System.out.println("POST /api/llm/" + type + "/" + llm);
//        System.out.println("▶️ useMock = " + useMock);
//        System.out.println("▶️ payload = " + input);
//
//        if (input == null || input.isEmpty()) {
//            return Map.of(
//                "success", false,
//                "data", "missing or empty request body"
//            );
//        }
//
//        String llmKey = llm.toLowerCase();
//        String result;
//
//        try {
//            switch (llmKey) {
//                case "chatgpt":
//                    result = useMock ? chatGptMock.reply(type, input) : chatGptService.reply(type, input);
//                    break;
//                case "claude":
//                    result = useMock ? claudeMock.reply(type, input) : claudeService.reply(type, input);
//                    break;
//                default:
//                    return Map.of(
//                        "success", false,
//                        "data", "unknown-provider: " + llm
//                    );
//            }
//
//            return Map.of(
//                "success", true,
//                "type", type,
//                "llm", llmKey,
//                "data", result
//            );
//
//        } catch (Exception e) {
//            System.err.println("❌ Error while handling request: " + e.getMessage());
//            return Map.of(
//                "success", false,
//                "data", "internal-error",
//                "error", e.getMessage()
//            );
//        }
//    }
//
//    
//    
//}

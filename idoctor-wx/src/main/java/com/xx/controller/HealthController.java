package com.xx.controller;

import com.xx.entity.Result;
import com.xx.service.IHealthService;
import com.xx.socket.SocketServer;
import com.xx.socket.WebSocketServer;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Api(value="/health", tags="健康指数接口")
@RestController
@RequestMapping("/health")
@CrossOrigin
public class HealthController {

    @Autowired
    private IHealthService healthService;

    @GetMapping
    public String startListner(){
        //起socket服务
        SocketServer server = new SocketServer();
        server.startSocketServer(8001);
        return "started";
    }

    @PostMapping("/heart")
    public Result heart(int age, int value){
        return healthService.heartPulse(age,value);
    }

    //推送数据接口
    @GetMapping("/socket/push/{cid}")
    public String pushToWeb(@PathVariable String  cid, String message) {
        try {
            WebSocketServer.sendInfo(cid,message);
        } catch (IOException e) {
            e.printStackTrace();
            return "发送异常";
        }
        return "推送成功";
    }

}

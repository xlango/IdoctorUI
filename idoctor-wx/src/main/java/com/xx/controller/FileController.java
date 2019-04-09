//package com.xx.controller;
//
//import com.baidu.aip.speech.AipSpeech;
//import com.baidu.aip.speech.TtsResponse;
//import com.baidu.aip.util.Util;
//import io.swagger.annotations.Api;
//import org.apache.commons.io.IOUtils;
//import org.json.JSONObject;
//import org.springframework.data.elasticsearch.annotations.MultiField;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.sound.sampled.AudioFormat;
//import javax.sound.sampled.AudioInputStream;
//import javax.sound.sampled.AudioSystem;
//import java.io.*;
//
//@Api(value="/file", tags="文件接口")
//@RestController
//@RequestMapping("/file")
//@CrossOrigin
//public class FileController {
//
//    //设置APPID/AK/SK
//    public static final String APP_ID = "15964978";
//    public static final String API_KEY = "81SCg10XbYPuReEjlQ87Uqds";
//    public static final String SECRET_KEY = "UakQkuzRIrdNb4vR7o2QGNoPa4lYbsve";
//
//
//    @RequestMapping(value = "/upload")
//    public Object speechReco(@RequestParam("file") MultipartFile file) {
//        try {
//            byte[] pcmBytes = mp3Convertpcm(file.getInputStream());
//            JSONObject resultJson = speechBdApi(pcmBytes);
//            System.out.println(resultJson.toString());
//            if (null != resultJson && resultJson.getInt("err_no") == 0) {
//                return resultJson.getJSONArray("result").get(0).toString().split("，")[0];
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return "";
//    }
//
//    /**
//     * @Description MP3转换pcm
//     * @param mp3Stream
//     *            原始文件流
//     * @return 转换后的二进制
//     * @throws Exception
//     * @author liuyang
//     * @blog http://www.pqsky.me
//     * @date 2018年1月30日
//     */
//    public byte[] mp3Convertpcm(InputStream mp3Stream) throws Exception {
//        //BufferedInputStream zipTest=new BufferedInputStream(mp3Stream);
//        // 原MP3文件转AudioInputStream
//        AudioInputStream mp3audioStream = AudioSystem.getAudioInputStream(mp3Stream);
//        // 将AudioInputStream MP3文件 转换为PCM AudioInputStream
//        AudioInputStream pcmaudioStream = AudioSystem.getAudioInputStream(AudioFormat.Encoding.PCM_SIGNED,
//                mp3audioStream);
//        byte[] pcmBytes = IOUtils.toByteArray(pcmaudioStream);
//        pcmaudioStream.close();
//        mp3audioStream.close();
//        return pcmBytes;
//    }
//
//    /**
//     * @Description 调用百度语音识别API
//     * @param pcmBytes
//     * @return
//     * @author liuyang
//     * @blog http://www.pqsky.me
//     * @date 2018年1月30日
//     */
//    public static JSONObject speechBdApi(byte[] pcmBytes) {
//        // 初始化一个AipSpeech
//        AipSpeech client = new AipSpeech(APP_ID, API_KEY, SECRET_KEY);
//        // 可选：设置网络连接参数
//        client.setConnectionTimeoutInMillis(2000);
//        client.setSocketTimeoutInMillis(60000);
//        // 调用接口
//        JSONObject res = client.asr(pcmBytes, "pcm", 16000, null);
//        return res;
//    }
//
//    @RequestMapping(value = "/mp3")
//    public String speechReco(String word) {
//        // 初始化一个AipSpeech
//        AipSpeech client = new AipSpeech(APP_ID, API_KEY, SECRET_KEY);
//
//        // 可选：设置网络连接参数
//        client.setConnectionTimeoutInMillis(2000);
//        client.setSocketTimeoutInMillis(60000);
//
//        // 可选：设置代理服务器地址, http和socket二选一，或者均不设置
//        //client.setHttpProxy("proxy_host", 8003);  // 设置http代理
//        //client.setSocketProxy("proxy_host", proxy_port);  // 设置socket代理
//
//        // 可选：设置log4j日志输出格式，若不设置，则使用默认配置
//        // 也可以直接通过jvm启动参数设置此环境变量
//        System.setProperty("aip.log4j.conf", "path/to/your/log4j.properties");
//
//        // 调用接口
//        TtsResponse res = client.synthesis(word, "zh", 1, null);
//        byte[] data = res.getData();
//        JSONObject res1 = res.getResult();
//        if (data != null) {
//            try {
//                //Util.writeBytesToFileSystem(data, "output.mp3");
//                OutputStream outputStream = response.getOutputStream();
//                return data;
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        if (res1 != null) {
//            System.out.println(res1.toString(2));
//        }
//        return res1.toString(2);
//    }
//}

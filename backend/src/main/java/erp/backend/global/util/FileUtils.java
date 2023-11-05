package erp.backend.global.util;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.Arrays;
import java.util.Objects;

@Slf4j
public class FileUtils {
    public static String generatorFilePath(String saveId, String schema) {
        String userDir = System.getProperty("user.dir");
        // 개발단계에서 파일 저장 서버가 없는 관계로 본인의 첨부파일만 저장 가능
        String erpFilePath = userDir + "/backend/src/main/resources/media/" + schema;
        File downloadDir = new File(erpFilePath);
        if (!downloadDir.exists()) downloadDir.mkdirs();
        return erpFilePath + "/" + saveId;
    }

    public static String generatorPicturePath(String saveId, String schema) {
        String userDir = System.getProperty("user.dir");
        String picturePath = userDir + "/frontend/public/img/" + schema;
        File downloadDir = new File(picturePath);
        if (!downloadDir.exists()) downloadDir.mkdirs();
        return picturePath + "/" + saveId;
    }

    public static void deleteFile(String path) {
        File file = new File(path);

        if (file.exists() || file.isDirectory()) {
            File[] files = file.listFiles();

            if (files != null) {
                Arrays.stream(Objects.requireNonNull(files)).forEach(childFile -> {
                    String resultMessage = childFile.delete() ? " 삭제성공" : " 삭제실패";
                    log.info(childFile.getName() + resultMessage);
                });
            }

            String resultMessage = file.delete() ? "파일삭제 성공" : "파일삭제 실패";
            log.info(resultMessage);
        } else {
            log.info("파일이 존재하지 않습니다.");
        }
    }
}

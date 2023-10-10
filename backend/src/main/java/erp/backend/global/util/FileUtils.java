package erp.backend.global.util;

import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
public class FileUtils {

    public static String generatorFilePath(String saveId, String schema) {
        String rootDir = System.getProperty("user.dir");
        return rootDir + "/backend/src/main/resources/media/" + schema + "/" + saveId;
    }

    public static void deleteFile(String path) {

        File file = new File(path);

        if (file.exists()) { //파일존재여부확인

            if (file.isDirectory()) { //파일이 디렉토리인지 확인

                File[] files = file.listFiles();

                for (int i = 0; i < files.length; i++) {
                    if (files[i].delete()) {
                        log.info(files[i].getName() + " 삭제성공");
                    } else {
                        log.info(files[i].getName() + " 삭제실패");
                    }
                }

            }
            if (file.delete()) {
                log.info("파일삭제 성공");
            } else {
                log.info("파일삭제 실패");
            }

        } else {
            log.info("파일이 존재하지 않습니다.");
        }

    }
}

package erp.backend.global.util;

import java.util.List;

public class ArrayUtils {
    public static boolean isNullOrEmpty(List list) {
        return list == null || list.isEmpty();
    }
}